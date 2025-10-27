import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

import Restaurant from "@/models/restaurants";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  await connectToDatabase();
  const { id } = context.params;
  try {
    console.log("🚀 ~ route.ts:13 ~ GET ~ id:", id);

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return NextResponse.json(
        { error: "Restaurante no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(restaurant, { status: 200 });
  } catch (error) {
    console.error("Error al obtener restaurante:", error);
    return NextResponse.json(
      { error: "Error al obtener los datos del restaurante" },
      { status: 500 }
    );
  }
}
