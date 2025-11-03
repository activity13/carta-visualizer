import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import CategorySchema from "@/models/categories";
import MealSchema from "@/models/meals";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: restaurantId } = await params;
    const body = await req.json();

    await connectToDatabase();

    // Validar si contiene meals o categories
    const hasMeals = Array.isArray(body.meals);
    const hasCategories = Array.isArray(body.categories);

    if (!hasMeals && !hasCategories) {
      return NextResponse.json(
        { error: "No se enviaron categorías ni platos válidos." },
        { status: 400 }
      );
    }

    const results: any = { updatedMeals: [], updatedCategories: [] };

    // 🔹 Actualizar categorías si vienen
    if (hasCategories) {
      for (const cat of body.categories) {
        if (!cat.id) continue;

        const updateFields: any = {};
        const manualFlags: any = {};

        if (cat.name !== undefined) {
          updateFields.name = cat.name;
          manualFlags.name_manual = true;
        }
        if (cat.name_en !== undefined) {
          updateFields.name_en = cat.name_en;
          manualFlags.name_en_manual = true;
        }
        if (cat.description !== undefined) {
          updateFields.description = cat.description;
          manualFlags.description_manual = true;
        }
        if (cat.description_en !== undefined) {
          updateFields.description_en = cat.description_en;
          manualFlags.description_en_manual = true;
        }

        const updated = await CategorySchema.findOneAndUpdate(
          { _id: cat.id, restaurantId },
          { $set: { ...updateFields, ...manualFlags } },
          { new: true }
        );

        if (updated) results.updatedCategories.push(updated);
      }
    }

    // 🔹 Actualizar platos si vienen
    if (hasMeals) {
      for (const meal of body.meals) {
        if (!meal.id) continue;

        const updateFields: any = {};
        const manualFlags: any = {};

        if (meal.name !== undefined) {
          updateFields.name = meal.name;
          manualFlags.name_manual = true;
        }
        if (meal.name_en !== undefined) {
          updateFields.name_en = meal.name_en;
          manualFlags.name_en_manual = true;
        }
        if (meal.description !== undefined) {
          updateFields.description = meal.description;
          manualFlags.description_manual = true;
        }
        if (meal.description_en !== undefined) {
          updateFields.description_en = meal.description_en;
          manualFlags.description_en_manual = true;
        }
        if (meal.ingredients !== undefined) {
          updateFields.ingredients = meal.ingredients;
          manualFlags.ingredients_manual = true;
        }
        if (meal.ingredients_en !== undefined) {
          updateFields.ingredients_en = meal.ingredients_en;
          manualFlags.ingredients_en_manual = true;
        }

        const updated = await MealSchema.findOneAndUpdate(
          { _id: meal.id, restaurantId },
          { $set: { ...updateFields, ...manualFlags } },
          { new: true }
        );

        if (updated) results.updatedMeals.push(updated);
      }
    }

    return NextResponse.json({ success: true, results }, { status: 200 });
  } catch (error) {
    console.error("Error actualizando menú:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
