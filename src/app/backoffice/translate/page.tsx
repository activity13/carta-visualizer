"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

type MealOut = {
  id: string;
  name: string;
  description?: string;
  ingredients: string[];
};

type CategoryOut = {
  id: string;
  name: string;
  description?: string;
  meals: MealOut[];
};

export default function TranslationPage() {
  const [restaurantId, setRestaurantId] = useState("");
  const [categories, setCategories] = useState<CategoryOut[]>([]);
  const [translated, setTranslated] = useState<CategoryOut[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  // --- Mutation para llamar al endpoint ---
  const translateMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/translate/${restaurantId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from: "es", to: "en" }),
      });
      if (!res.ok) throw new Error("Error al traducir");
      return res.json();
    },
    onSuccess: (data) => {
      toast.success(`Traducción completada (${data.translatedCount} textos)`);
      setTranslated(data.categories);
    },
    onError: (err) => {
      toast.error(err.message || "Error en la traducción");
    },
  });

  const handleEditChange = (
    catId: string,
    mealId: string | null,
    field: string,
    value: string,
    ingredientIndex?: number
  ) => {
    setTranslated((prev) =>
      prev.map((cat) => {
        if (cat.id !== catId) return cat;

        if (mealId) {
          return {
            ...cat,
            meals: cat.meals.map((m) => {
              if (m.id !== mealId) return m;

              if (ingredientIndex !== undefined) {
                const newIngs = [...m.ingredients];
                newIngs[ingredientIndex] = value;
                return { ...m, ingredients: newIngs };
              }

              return { ...m, [field]: value };
            }),
          };
        } else {
          return { ...cat, [field]: value };
        }
      })
    );
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!restaurantId) return toast.error("Falta el ID del restaurante");

    const res = await fetch("/api/translations/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        restaurantId,
        categories: translated,
      }),
    });

    if (!res.ok) {
      toast.error("Error al guardar las traducciones");
      return;
    }

    toast.success("Traducciones guardadas correctamente");
    setIsEditing(false);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        🧠 Sistema de Traducción Automática
      </h1>

      {/* Entrada del restaurante */}
      <div className="flex items-center gap-4">
        <Input
          placeholder="ID del restaurante"
          value={restaurantId}
          onChange={(e) => setRestaurantId(e.target.value)}
          className="max-w-md"
        />
        <Button
          onClick={() => translateMutation.mutate()}
          disabled={!restaurantId || translateMutation.isPending}
        >
          {translateMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Traduciendo...
            </>
          ) : (
            "Traducir al inglés automáticamente"
          )}
        </Button>
      </div>

      {/* Vista de resultados */}
      {translated.length > 0 && (
        <div className="space-y-8">
          {translated.map((cat, i) => (
            <Card key={i}>
              <CardHeader>
                <h2 className="text-xl font-semibold">{cat.name}</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-sm text-muted-foreground">
                      Nombre (original)
                    </p>
                    <p>{cat.name}</p>
                    <p className="font-semibold text-sm text-muted-foreground mt-2">
                      Descripción (original)
                    </p>
                    <p>{cat.description || "—"}</p>
                  </div>
                  <div>
                    <Input
                      value={cat.name}
                      onChange={(e) =>
                        handleEditChange(cat.id, null, "name", e.target.value)
                      }
                    />
                    <Textarea
                      className="mt-2"
                      value={cat.description || ""}
                      onChange={(e) =>
                        handleEditChange(
                          cat.id,
                          null,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>

                {/* Platos */}
                {cat.meals.map((m, j) => (
                  <div
                    key={j}
                    className="border-t pt-4 mt-4 grid grid-cols-2 gap-4"
                  >
                    <div>
                      <p className="font-semibold text-sm text-muted-foreground">
                        Plato (original)
                      </p>
                      <p>{m.name}</p>
                      {m.description && (
                        <>
                          <p className="font-semibold text-sm text-muted-foreground mt-2">
                            Descripción (original)
                          </p>
                          <p>{m.description}</p>
                        </>
                      )}
                      {m.ingredients.length > 0 && (
                        <>
                          <p className="font-semibold text-sm text-muted-foreground mt-2">
                            Ingredientes (original)
                          </p>
                          <ul className="list-disc pl-5">
                            {m.ingredients.map((ing, k) => (
                              <li key={k}>{ing}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>

                    <div>
                      <Input
                        value={m.name}
                        onChange={(e) =>
                          handleEditChange(cat.id, m.id, "name", e.target.value)
                        }
                      />
                      <Textarea
                        className="mt-2"
                        value={m.description || ""}
                        onChange={(e) =>
                          handleEditChange(
                            cat.id,
                            m.id,
                            "description",
                            e.target.value
                          )
                        }
                      />
                      {m.ingredients.length > 0 && (
                        <div className="space-y-2 mt-2">
                          {m.ingredients.map((ing, k) => (
                            <Input
                              key={k}
                              value={ing}
                              onChange={(e) =>
                                handleEditChange(
                                  cat.id,
                                  m.id,
                                  "ingredients",
                                  e.target.value,
                                  k
                                )
                              }
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={!isEditing}>
              <Save className="mr-2 h-4 w-4" />
              Guardar traducciones
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
