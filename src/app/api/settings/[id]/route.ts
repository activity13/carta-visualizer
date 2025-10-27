import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

import Restaurant from "@/models/restaurants";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    console.log("🚀 ~ route.ts:13 ~ GET ~ id:", id);

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return NextResponse.json(
        { error: "Restaurante no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(restaurant, { status: 200 });
  } catch (error: any) {
    console.error("Error al obtener restaurante:", error);
    return NextResponse.json(
      { error: "Error al obtener los datos del restaurante" },
      { status: 500 }
    );
  }
}
