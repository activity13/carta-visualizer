import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Meal from "@/models/meals";
import Restaurant from "@/models/restaurants";
export async function GET() {
  try {
    await connectToDatabase();
    // Query de prueba mientras se implementa la lógica
    const restauranteDePrueba = await Restaurant.findOne({
      name: "la-k",
    });
    const meals = await Meal.find({ restaurantId: restauranteDePrueba?._id });
    console.log("Las comidas se han cargado.");
    return NextResponse.json(meals, { status: 200 });
  } catch (error) {
    console.error("Error interno en el servidor", error);
    return NextResponse.json(
      {
        error: "Ha ocurrido un problema. Por favor, intenta nuevamente",
        error_message:
          error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
