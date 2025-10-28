import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { connectToDatabase } from "@/lib/mongodb";
import Restaurant from "@/models/restaurants";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectToDatabase();
    const business = await Restaurant.findById(id);
    if (!business) {
      return NextResponse.json(
        { error: "Negocio no encontrado" },
        { status: 404 }
      );
    }

    const qrPath = path.join(
      process.cwd(),
      "public",
      business.slug,
      "qr",
      business.QrCode || "qr-final.png"
    );

    if (!fs.existsSync(qrPath)) {
      return NextResponse.json(
        { error: "El QR aún no ha sido generado" },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(qrPath);

    // 🔽 Responder como archivo descargable
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="${business.slug}-qr.png"`,
      },
    });
  } catch (error) {
    console.error("❌ Error descargando el QR:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}