"use client";

import { useState } from "react";

// 🧩 Tipos bien definidos
interface Meal {
  id: string;
  name: string;
  price: number;
  description?: string;
}

interface Category {
  id: string;
  name: string;
  meals: Meal[];
}

interface KartaData {
  categories: Category[];
}

interface KartaProps {
  data: KartaData;
}

export default function LaKarta({ data }: KartaProps) {
  const [selected, setSelected] = useState<Meal | null>(null);

  return (
    <div className="max-w-3xl mx-auto">
      {data.categories.map((cat) => (
        <div key={cat.id} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{cat.name}</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {cat.meals.map((meal) => (
              <li
                key={meal.id}
                onClick={() => setSelected(meal)}
                className="p-3 rounded-xl border border-gray-300 hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex justify-between">
                  <span>{meal.name}</span>
                  <span className="font-semibold">S/ {meal.price}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-80">
            <h3 className="text-lg font-bold mb-2">{selected.name}</h3>
            <p className="text-sm text-gray-700 mb-4">
              {selected.description || "Sin descripción disponible"}
            </p>
            <button
              onClick={() => setSelected(null)}
              className="mt-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
