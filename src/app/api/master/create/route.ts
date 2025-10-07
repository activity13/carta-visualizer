import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import MealSchema from "@/models/meals";
export async function POST(request: Request) {
  try {
    const { formData, restaurantId } = await request.json();
    await connectToDatabase();
    console.log("ID recibido:", restaurantId);
    const newMeal = new MealSchema({
      restaurantId: restaurantId,
      categoryId: formData?.categoryId,
      name: formData.name,
      description: formData.description,
      shortDescription: formData.shortDescription,

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
    });
    await newMeal.save();
    return NextResponse.json(
      { message: "Conexión exitosa a la base de datos" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error interno en el servidor", error);
    return NextResponse.json(
      {
        error: "Ha ocurrido un problemformData. Por favor, intenta nuevamente",
        error_message:
          error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
