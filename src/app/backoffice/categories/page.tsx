"use client";

import React, { useEffect } from "react";
import CategoryUI from "@/components/ui/categoryUI";
import { useSession } from "next-auth/react";
export default function CategoriesPage() {
  // Aquí puedes obtener el restaurantId de alguna manera, por ejemplo, de la sesión o props

  const { data: session } = useSession();
  const restaurantId = session?.user?.restaurantId;

  if (!restaurantId) return null;

  return (
    <>
      <button
        className="bg-blue-500 m-24 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => console.log(restaurantId)}
      >
        test
      </button>
      <CategoryUI restaurantId={restaurantId} />
    </>
  );
}
