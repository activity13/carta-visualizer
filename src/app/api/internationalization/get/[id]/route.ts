import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

import Restaurant from "@/models/restaurants";
import CategorySchema from "@/models/categories";
import MealSchema from "@/models/meals";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // ✅ resolver promesa
    await connectToDatabase();

    // 1️⃣ Buscar restaurante
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return NextResponse.json(
        { error: "Restaurante no encontrado" },
        { status: 404 }
      );
    }

    // 2️⃣ Buscar categorías del restaurante
    const categories = await CategorySchema.find({
      restaurantId: restaurant._id,
    }).sort({ order: 1 });

    // 3️⃣ Buscar platos del restaurante
    const meals = await MealSchema.find({
      restaurantId: restaurant._id,
      "display.showInMenu": true,
    });

    // 4️⃣ Estructurar respuesta separada
    const formattedCategories = categories.map((cat) => ({
      id: cat._id.toString(), // ✅ asegurar tipo string
      name: cat.name,
      name_en: cat.name_en,
      description: cat.description,
      description_en: cat.description_en,
    }));

    const formattedMeals = meals.map((meal) => ({
      id: meal._id.toString(),
      categoryId: meal.categoryId?.toString() || null,
      name: meal.name,
      name_en: meal.name_en,
      description: meal.shortDescription || meal.description,
      description_en: meal.description_en,
      tags: meal.dietaryTags,
      ingredients: meal.ingredients,
      ingredients_en: meal.ingredients_en,
    }));

    // 5️⃣ Respuesta final separada
    return NextResponse.json(
      {
        restaurant: {
          id: restaurant._id.toString(),
          name: restaurant.name,
        },
        categories: formattedCategories,
        meals: formattedMeals,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching menu:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
