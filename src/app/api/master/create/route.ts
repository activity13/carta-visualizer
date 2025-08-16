import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import MealSchema from "@/models/meals";
import RestaurantSchema from "@/models/restaurants";
import CategorySchema from "@/models/categories";
import test from "node:test";
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const test_restaurant = await RestaurantSchema.findOne({
      name: "la-k",
    });
    const test_category = await CategorySchema.findOne({ code: 1 });
    console.log(test_category);
    const a = await request.json();
    const newMeal = new MealSchema({
      restaurantId: test_restaurant?._id,
      categoryId: test_category?._id,
      name: a.name,
      description: a.description,
      shortDescription: a.shortDescription,

      // Precios
      basePrice: a?.basePrice,
      comparePrice: a?.comparePrice,

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
        error: "Ha ocurrido un problema. Por favor, intenta nuevamente",
        error_message:
          error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
