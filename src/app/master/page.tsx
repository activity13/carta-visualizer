"use client";
import { useEffect, useState } from "react";
import { ObjectId, set } from "mongoose";
import Axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateMealForm from "@/components/ui/createMeal";

export default function MasterPage() {
  interface Meal {
    name: string;
    basePrice: string;
    _id: ObjectId;
  }
  const [meals, setMeals] = useState<Meal[]>([]);
  const [productId, setProductId] = useState<ObjectId | null>(null);
  const [isDialogEditing, setIsDialogEditing] = useState(false);
  const fetchMeals = async () => {
    try {
      const response = await Axios.get("/api/master/get");
      setMeals(response.data);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };
  const toggleDialog = (id: ObjectId) => {
    setProductId(id);
    setIsDialogEditing(!isDialogEditing);
  };
  useEffect(() => {
    fetchMeals();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <h1 className="text-4xl font-bold mb-8">Welcome to Master Page</h1>
      <Table className="table-auto     ñ">
        <TableHeader>
          <TableRow>
            <TableHead>Meal</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meals.map((meal, index) => (
            <TableRow key={index}>
              <TableCell>
                <button
                  className="btn btn-primary "
                  onClick={() => toggleDialog(meal._id)}
                >
                  <a href="#" className="underline-offset-4">
                    {meal.name}
                  </a>
                </button>
              </TableCell>
              <TableCell>{meal.basePrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CreateMealForm
        isOpen={isDialogEditing}
        onClose={toggleDialog}
        fetchMeals={fetchMeals}
        mealId={productId}
      />
    </main>
  );
}
