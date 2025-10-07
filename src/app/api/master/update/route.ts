import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import MealSchema from "@/models/meals";
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { params, formData } = await request.json();
    const mealUpdated = await MealSchema.updateOne(
      { _id: params.id },
      {
        $set: {
          name: formData.name,
          description: formData.description,
          shortDescription: formData.shortDescription,

          // Información básica
          categoryId: formData?.categoryId,

          // Precios
          basePrice: formData?.basePrice,
          comparePrice: formData?.comparePrice,

          // Imágenes
          images: [],

          // Ingredientes y alérgenos
          ingredients: [""],
          allergens: [],
          dietaryTags: [],

          // Variantes (simplificado)
          variants: [],

          // Disponibilidad
          availability: {
            isAvailable: true,
            availableQuantity: "",
          },

          // Tiempo de preparación
          preparationTime: {
            min: "",
            max: "",
          },

          // Configuración de visualización
          display: {
            order: "",
            isFeatured: false,
            showInMenu: true,
          },

          // Estado
          status: "active",

          // SEO
          searchTags: [""],
        },
      }
    );
    if (mealUpdated.matchedCount === 0) {
      throw new Error(
        "No se encontró ningún documento con el _id especificado."
      );
    }
    if (mealUpdated.modifiedCount === 0) {
      console.log("No se realizaron cambios en el documento.");
    }
    return NextResponse.json(
      { message: "Comida actualizada con éxito" },
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
