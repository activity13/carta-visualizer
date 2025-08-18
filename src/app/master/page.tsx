"use client";
import { useEffect, useState } from "react";
import { ObjectId } from "mongoose";
import Axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import CreateMealForm from "@/components/ui/createMeal";

export default function MasterPage() {
  interface Meal {
    name: string;
    basePrice: string;
    _id: ObjectId;
    availability: {
      isAvailable: boolean;
    };
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

  const handleToggleAvailable = async (
    mealId: ObjectId,
    currentState: boolean
  ) => {
    try {
      await Axios.put("/api/master/update-availability", {
        mealId,
        isAvailable: !currentState,
      });
      fetchMeals(); // Refresca la lista
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };
  useEffect(() => {
    fetchMeals();
  }, []);
  return (
    <main className="min-h-screen p-8">
      <Card className="max-w-4xl mx-auto backdrop-blur-2xl shadow-2xl rounded bg-white/95 ">
        <CardHeader>
          <CardTitle className="text-center text-green-900 text-2xl">
            Master of Articles
          </CardTitle>
        </CardHeader>

        <CardContent className="flex justify-center">
          <Table>
            <TableHeader className="max-w-[100px] table-auto bg-green-800 hover:bg-green-800 text-green-900">
              <TableRow>
                <TableHead className="text-white font-semibold ">
                  Meal
                </TableHead>
                <TableHead className="text-white font-semibold ">
                  Price
                </TableHead>
                <TableHead className="text-white font-semibold text-center">
                  Active
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {meals.map((meal, index) => (
                <TableRow key={index}>
                  <TableCell className="text-gray-800 font-medium max-w-[100px] overflow-x-auto responsive whitespace-nowrap scrollbar-none ">
                    <button
                      className="hover:cursor-pointer hover:text-green-800  hover:font-bold"
                      onClick={() => toggleDialog(meal._id)}
                    >
                      {meal.name}
                    </button>
                  </TableCell>
                  <TableCell className="font-semibold text-black">
                    S/. {meal.basePrice}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Switch
                        checked={meal.availability?.isAvailable}
                        onCheckedChange={() =>
                          handleToggleAvailable(
                            meal._id,
                            meal.availability?.isAvailable
                          )
                        }
                        className="data-[state=checked]:bg-green-800 data-[state=unchecked]:bg-gray-400"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CreateMealForm
        isOpen={isDialogEditing}
        onClose={toggleDialog}
        fetchMeals={fetchMeals}
        mealId={productId}
      />
    </main>
  );
}
