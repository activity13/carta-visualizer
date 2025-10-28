import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Meal from "@/models/meals";

export async function PUT(req: Request) {
  const body = await req.json();
  const { mealId, isAvailable } = body;

  if (!mealId || typeof isAvailable !== "boolean") {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  await connectToDatabase();

  try {
    const meal = await Meal.findByIdAndUpdate(
      mealId,
      { "display.showInMenu": isAvailable },
      { new: true }
    );

    if (!meal) {
      return NextResponse.json({ error: "Meal not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, meal });
  } catch (error) {
    console.error("Error updating meal availability:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
