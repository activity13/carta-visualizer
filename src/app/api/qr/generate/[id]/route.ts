import { NextResponse } from "next/server";
import QRCode from "qrcode";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import { connectToDatabase } from "@/lib/mongodb";
import Restaurant from "@/models/restaurants";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const business = await Restaurant.findById(id);
    if (!business) {
      return NextResponse.json(
        { error: "Negocio no encontrado" },
        { status: 404 }
      );
    }

    // 📍 Rutas de archivos
    const publicDir = path.join(process.cwd(), "public");
    const framePath = path.join(
      publicDir,
      business.slug,
      "images",
      business.frameQR
    );
    const outputDir = path.join(publicDir, business.slug, "qr");
    const outputPath = path.join(outputDir, "qr-final.png");

    if (!fs.existsSync(framePath)) {
      return NextResponse.json(
        { error: "No existe el marco QR" },
        { status: 400 }
      );
    }

    // Crear directorio de salida si no existe
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    // 1️⃣ Generar QR temporal (por ejemplo, con la URL del menú del negocio)
    const qrData = `https://192.168.1.122:3000/${business.slug}`;
    const qrBuffer = await QRCode.toBuffer(qrData, {
      width: 600,
      color: { dark: "#000000", light: "#0000" }, // fondo transparente
    });

    // 2️⃣ Combinar con el marco usando Sharp
    const finalImage = await sharp(framePath)
      .composite([{ input: qrBuffer, gravity: "center" }]) // centra el QR sobre el marco
      .toFile(outputPath);

    // 3️⃣ Guardar nombre del archivo en BD
    business.QrCode = "qr-final.png";
    await business.save();

    return NextResponse.json({
      success: true,
      message: "QR generado correctamente",
      qrPath: `/${business.slug}/qr/qr-final.png`,
    });
  } catch (err) {
    console.error("❌ Error generando el QR:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
