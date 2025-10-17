import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

import Restaurant from "@/models/restaurants";
import CategorySchema from "@/models/categories";
import MealSchema from "@/models/meals";

export async function GET(
  req: Request,
  context: { params: Promise<{ subdomain: string }> }
) {
  try {
    const { subdomain } = await context.params; //
    const tag = `menu-${subdomain}`;
    await connectToDatabase();
    console.log("⚡ Regenerando menú desde la DB:", new Date().toISOString());
    // 1. Buscar restaurante
    const restaurant = await Restaurant.findOne({ slug: subdomain });
    if (!restaurant) {
      return NextResponse.json(
        { error: "Restaurante no encontrado" },
        { status: 404 }
      );
    }

    // 2. Buscar categorías del restaurante
    const categories = await CategorySchema.find({
      restaurantId: restaurant._id,
      isActive: true,
    });

    // 3. Buscar platos del restaurante
    const meals = await MealSchema.find({
      restaurantId: restaurant._id,
      "display.showInMenu": true,
    });

    // 4. Agrupar platos en sus categorías
    const categoriesWithMeals = categories.map((cat) => {
      const catMeals = meals.filter(
        (meal) => meal.categoryId.toString() === cat._id.toString()
      );

      return {
        id: cat._id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        meals: catMeals.map((m) => ({
          id: m._id,
          name: m.name,
          description: m.shortDescription || m.description,
          price: m.basePrice,
          comparePrice: m.comparePrice,
          images: m.images,
          tags: m.dietaryTags,
          featured: m.display.isFeatured,
          ingredients: [m.ingredients],
        })),
      };
    });
    // 5. Respuesta final
    return NextResponse.json(
      {
        restaurant: {
          id: restaurant._id,
          name: restaurant.name,
          slug: restaurant.slug,
          description: restaurant.description,
          direction: restaurant.direction,
          location: restaurant.location,
          phone: restaurant.phone,
          image: restaurant.image,
        },
        categories: categoriesWithMeals,
      },
      {
        headers: {
          "Cache-Tag": tag, // 🔥 esto ayuda al control de caché por tag
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching menu:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
