import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Meal from "@/models/meals";
export async function GET(req: Request) {
  try {
    await connectToDatabase();
    // Query de prueba mientras se implementa la lógica
    const { searchParams } = new URL(req.url || "");
    const id = searchParams.get("id");

    const meal = await Meal.findOne({ _id: id });

    if (!meal) {
      return NextResponse.json(
        { error: "Comida no encontrada" },
        { status: 404 }
      );
    }
    return NextResponse.json(meal, { status: 200 });
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
