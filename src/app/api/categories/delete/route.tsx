import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import CategorySchema from "@/models/categories";

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { id, restaurantId } = body;

    if (!id || !restaurantId) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios" },
        { status: 400 }
      );
    }

    const deleted = await CategorySchema.findOneAndDelete({
      _id: id,
      restaurantId,
    });

    if (!deleted) {
      return NextResponse.json(
        { error: "Categoría no encontrada o no pertenece al restaurante" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Categoría eliminada exitosamente" },
      { status: 200 }
    );
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
