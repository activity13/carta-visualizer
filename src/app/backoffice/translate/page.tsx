"use client";

import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// -------------------------------
// Tipos
// -------------------------------
interface Category {
  id: string;
  name: string;
  name_en?: string;
  description?: string;
  description_en?: string;
}

interface Meal {
  id: string;
  categoryId: string | null;
  name: string;
  name_en?: string;
  description?: string;
  description_en?: string;
  ingredients?: string[];
  ingredients_en?: string[];
  tags?: string[];
}

interface MenuResponse {
  restaurant: { id: string; name: string };
  categories: Category[];
  meals: Meal[];
}

// -------------------------------
// Componente principal
// -------------------------------
export default function TranslationPage() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const restaurantId = session?.user?.restaurantId;

  const [menuData, setMenuData] = useState<MenuResponse | null>(null);
  const [editingMealId, setEditingMealId] = useState<string | null>(null);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<string>("categories");

  // -------------------------------
  // Query: Obtener menú
  // -------------------------------
  const { isLoading, isError } = useQuery({
    queryKey: ["menu", restaurantId],

    queryFn: async () => {
      const res = await axios.get(
        `/api/internationalization/get/${restaurantId}`
      );
      setMenuData(res.data);
      return res.data as MenuResponse;
    },
    enabled: !!restaurantId,
  });

  // Refrescar menú desde API
  const refreshMenu = async () => {
    const res = await axios.get(
      `/api/internationalization/get/${restaurantId}`
    );
    setMenuData(res.data);
    await queryClient.invalidateQueries({ queryKey: ["menu", restaurantId] });
  };

  // -------------------------------
  // Mutación: Traducción automática
  // -------------------------------
  const translateMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        `/api/internationalization/translate-menu/${restaurantId}`,
        {
          to: "en",
          from: "es",
          save: true,
        }
      );
      console.log("🚀 ~ page.tsx:95 ~ TranslationPage ~ res:", res);
      return res.data;
    },
    onMutate: () => toast.loading("Traduciendo automáticamente..."),
    onSuccess: async () => {
      toast.dismiss();
      toast.success("Traducción completada con éxito");
      await refreshMenu();
      await queryClient.invalidateQueries({ queryKey: ["menu", restaurantId] });
    },
    onError: (err) => {
      toast.dismiss();
      toast.error("Error al traducir automáticamente");
      console.error(err);
    },
  });

  // -------------------------------
  // Guardar una categoría
  // -------------------------------
  const saveSingleCategory = async (category: Category) => {
    try {
      toast.loading("Guardando categoría...");
      const payload = {
        categories: [
          {
            id: category.id,
            name_en: category.name_en ?? "",
            description_en: category.description_en ?? "",
          },
        ],
      };
      await axios.post(
        `/api/internationalization/update-menu/${restaurantId}`,
        payload
      );
      toast.dismiss();
      toast.success("Categoría actualizada");
      setEditingCategoryId(null);
      await refreshMenu();
    } catch (err) {
      toast.dismiss();
      toast.error("Error al guardar la categoría");
      console.error(err);
    }
  };

  // -------------------------------
  // Guardar un plato
  // -------------------------------
  const saveSingleMeal = async (meal: Meal) => {
    try {
      toast.loading("Guardando plato...");
      const payload = {
        meals: [
          {
            id: meal.id,
            name_en: meal.name_en ?? "",
            description_en: meal.description_en ?? "",
            ingredients_en: meal.ingredients_en ?? [],
          },
        ],
      };
      await axios.post(
        `/api/internationalization/update-menu/${restaurantId}`,
        payload
      );
      toast.dismiss();
      toast.success("Plato actualizado");
      setEditingMealId(null);
      await refreshMenu();
    } catch (err) {
      toast.dismiss();
      toast.error("Error al guardar el plato");
      console.error(err);
    }
  };

  // -------------------------------
  // Handlers para categorías
  // -------------------------------
  const handleCategoryFieldChange = (
    categoryId: string,
    field: keyof Category,
    value: string
  ) => {
    setMenuData((prev) => {
      if (!prev) return prev;
      const categories = prev.categories.map((cat) =>
        cat.id === categoryId ? { ...cat, [field]: value } : cat
      );
      return { ...prev, categories };
    });
  };

  // -------------------------------
  // Handlers para platos
  // -------------------------------
  const handleMealFieldChange = (
    mealId: string,
    field: keyof Meal,
    value: string
  ) => {
    setMenuData((prev) => {
      if (!prev) return prev;
      const meals = prev.meals.map((meal) =>
        meal.id === mealId ? { ...meal, [field]: value } : meal
      );
      return { ...prev, meals };
    });
  };

  const handleMealIngredientsChange = (mealId: string, raw: string) => {
    const parsed = raw
      .split(/,|\n/)
      .map((s) => s.trim())
      .filter(Boolean);

    setMenuData((prev) => {
      if (!prev) return prev;
      const meals = prev.meals.map((meal) =>
        meal.id === mealId ? { ...meal, ingredients_en: parsed } : meal
      );
      return { ...prev, meals };
    });
  };

  // Verificar si hay alguna edición activa
  const isAnyEditActive = editingMealId !== null || editingCategoryId !== null;

  // -------------------------------
  // Render
  // -------------------------------
  if (isLoading || !menuData) {
    return (
      <div className="min-h-screen pt-30 p-6 bg-card">
        <Skeleton className="h-10 w-1/3 mb-4 rounded-full" />
        <Skeleton className="h-32 w-full mb-2 rounded-full" />
        <Skeleton className="h-32 w-full mb-2 rounded-full" />
      </div>
    );
  } else if (isError) {
    return <div className="p-6 text-red-500">Error al cargar el menú.</div>;
  }

  return (
    <div className="min-h-screen p-24 bg-gradient-to-r from-green-950 via-green-900 to-green-950">
      {/* contenedor externo como categoryUI */}
      <div className="max-w-5xl mx-auto bg-green-950/90 border-2 border-green-900 rounded-2xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-6">
          Traducción del Menú
        </h1>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full text-white"
        >
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-green-900/80 border border-green-700 rounded-xl">
            <TabsTrigger
              value="categories"
              className="text-green-200 data-[state=active]:bg-green-800 data-[state=active]:text-yellow-300 rounded-lg"
            >
              Categorías ({menuData.categories.length})
            </TabsTrigger>
            <TabsTrigger
              value="meals"
              className="text-green-200 data-[state=active]:bg-green-800 data-[state=active]:text-yellow-300 rounded-lg"
            >
              Platos ({menuData.meals.length})
            </TabsTrigger>
          </TabsList>

          {/* PESTAÑA DE CATEGORÍAS */}
          <TabsContent value="categories" className="space-y-4 mt-6">
            {menuData.categories.map((cat) => {
              const isEditingThis = editingCategoryId === cat.id;
              return (
                <Card
                  key={cat.id}
                  className="shadow-md bg-green-900/80 border border-green-700 text-white rounded-2xl"
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-white">
                      {cat.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Español */}
                      <div className="space-y-3">
                        <div>
                          <p className="font-semibold text-sm mb-1 text-green-200">
                            Nombre (ES)
                          </p>
                          <Input
                            value={cat.name}
                            disabled
                            className="bg-green-950 border border-green-700 text-white placeholder:text-green-300 rounded px-2 py-2"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-sm mb-1 text-green-200">
                            Descripción (ES)
                          </p>
                          <Textarea
                            value={cat.description || ""}
                            disabled
                            rows={3}
                            className="bg-green-950 border border-green-700 text-white placeholder:text-green-300 rounded px-2 py-2 resize-none"
                          />
                        </div>
                      </div>

                      {/* Inglés */}
                      <div className="space-y-3">
                        <div>
                          <p className="font-semibold text-sm mb-1 text-green-200">
                            Nombre (EN)
                          </p>
                          <Input
                            value={cat.name_en || ""}
                            onChange={(e) =>
                              handleCategoryFieldChange(
                                cat.id,
                                "name_en",
                                e.target.value
                              )
                            }
                            placeholder="Category Name (EN)"
                            disabled={!isEditingThis}
                            className="bg-green-950 border border-green-700 text-white placeholder:text-green-300 rounded px-2 py-2"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-sm mb-1 text-green-200">
                            Descripción (EN)
                          </p>
                          <Textarea
                            value={cat.description_en || ""}
                            onChange={(e) =>
                              handleCategoryFieldChange(
                                cat.id,
                                "description_en",
                                e.target.value
                              )
                            }
                            placeholder="Category Description (EN)"
                            disabled={!isEditingThis}
                            rows={3}
                            className="bg-green-950 border border-green-700 text-white placeholder:text-green-300 rounded px-2 py-2 resize-none"
                          />
                        </div>

                        {/* Botones de acción */}
                        <div className="flex gap-2 pt-2">
                          {!isEditingThis ? (
                            <Button
                              size="sm"
                              onClick={() => setEditingCategoryId(cat.id)}
                              disabled={isAnyEditActive}
                              className="bg-green-700 text-white border border-green-600 hover:bg-green-800"
                            >
                              Editar
                            </Button>
                          ) : (
                            <>
                              <Button
                                size="sm"
                                variant="default"
                                onClick={() => saveSingleCategory(cat)}
                                className="bg-yellow-300 text-green-900 hover:bg-yellow-400"
                              >
                                Guardar
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={async () => {
                                  setEditingCategoryId(null);
                                  await refreshMenu();
                                }}
                                className="bg-transparent border border-green-700 text-green-300 hover:bg-green-800"
                              >
                                Cancelar
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {menuData.categories.length === 0 && (
              <div className="text-center py-12 text-green-300">
                No hay categorías disponibles
              </div>
            )}
          </TabsContent>

          {/* PESTAÑA DE PLATOS */}
          <TabsContent value="meals" className="space-y-4 mt-6">
            {menuData.categories.map((cat) => {
              const mealsInCategory = menuData.meals.filter(
                (meal) => meal.categoryId === cat.id
              );

              if (mealsInCategory.length === 0) return null;

              return (
                <Card
                  key={cat.id}
                  className="shadow-md bg-green-900/80 border border-green-700 text-white rounded-2xl"
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-white">
                      {cat.name} ({mealsInCategory.length} platos)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mealsInCategory.map((meal) => {
                      const isEditingThis = editingMealId === meal.id;
                      return (
                        <div
                          key={meal.id}
                          className="border border-green-700 rounded-lg p-4 bg-green-950/60"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Español */}
                            <div className="space-y-2">
                              <div>
                                <p className="font-semibold text-white">
                                  {meal.name}
                                </p>
                                <p className="text-sm text-green-300 mt-1">
                                  {meal.description || "Sin descripción"}
                                </p>
                              </div>
                              {meal.ingredients &&
                                meal.ingredients.length > 0 && (
                                  <div>
                                    <p className="text-xs font-semibold text-green-400">
                                      Ingredientes:
                                    </p>
                                    <p className="text-xs text-green-300">
                                      {meal.ingredients.join(", ")}
                                    </p>
                                  </div>
                                )}
                            </div>

                            {/* Inglés */}
                            <div className="space-y-2">
                              <Input
                                value={meal.name_en || ""}
                                onChange={(e) =>
                                  handleMealFieldChange(
                                    meal.id,
                                    "name_en",
                                    e.target.value
                                  )
                                }
                                placeholder="Meal Name (EN)"
                                disabled={!isEditingThis}
                                className="bg-green-950 border border-green-700 text-white placeholder:text-green-300 rounded px-2 py-2"
                              />
                              <Textarea
                                value={meal.description_en || ""}
                                onChange={(e) =>
                                  handleMealFieldChange(
                                    meal.id,
                                    "description_en",
                                    e.target.value
                                  )
                                }
                                placeholder="Description (EN)"
                                disabled={!isEditingThis}
                                rows={2}
                                className="bg-green-950 border border-green-700 text-white placeholder:text-green-300 rounded px-2 py-2"
                              />
                              <Textarea
                                value={(meal.ingredients_en || []).join(", ")}
                                onChange={(e) =>
                                  handleMealIngredientsChange(
                                    meal.id,
                                    e.target.value
                                  )
                                }
                                placeholder="Ingredients (EN) - separados por coma"
                                disabled={!isEditingThis}
                                rows={2}
                                className="bg-green-950 border border-green-700 text-white placeholder:text-green-300 rounded px-2 py-2"
                              />
                              <p className="text-xs text-green-400">
                                Ejemplo: chicken, cheese, oregano
                              </p>

                              {/* Acciones por plato */}
                              <div className="flex gap-2 pt-1">
                                {!isEditingThis ? (
                                  <Button
                                    size="sm"
                                    onClick={() => setEditingMealId(meal.id)}
                                    disabled={isAnyEditActive}
                                    className="bg-green-700 text-white border border-green-600 hover:bg-green-800"
                                  >
                                    Editar
                                  </Button>
                                ) : (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="default"
                                      onClick={() => saveSingleMeal(meal)}
                                      className="bg-yellow-300 text-green-900 hover:bg-yellow-400"
                                    >
                                      Guardar
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={async () => {
                                        setEditingMealId(null);
                                        await refreshMenu();
                                      }}
                                      className="bg-transparent border border-green-700 text-green-300 hover:bg-green-800"
                                    >
                                      Cancelar
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              );
            })}

            {menuData.meals.length === 0 && (
              <div className="text-center py-12 text-green-300">
                No hay platos disponibles
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      {/* Barra inferior fija */}
      <div className="fixed bottom-0 left-0 right-0 bg-green-950/90 border-t-2 border-green-900 p-4 shadow-lg z-10">
        <div className="flex flex-wrap gap-3 justify-between items-center max-w-5xl mx-auto">
          <div className="space-x-3">
            <Button
              onClick={() => translateMutation.mutate()}
              disabled={
                !restaurantId || translateMutation.isPending || isAnyEditActive
              }
              title={
                isAnyEditActive ? "Termina o cancela la edición actual" : ""
              }
              className="bg-gradient-to-r from-green-900 via-green-800 to-green-700 border-2 border-green-300 text-yellow-300 font-bold tracking-wide hover:bg-green-700 hover:text-white hover:border-yellow-300"
            >
              {translateMutation.isPending
                ? "Traduciendo..."
                : "Traducir automáticamente"}
            </Button>
          </div>
          {isAnyEditActive && (
            <p className="text-sm text-yellow-300 font-medium">
              ⚠️ Hay una edición activa. Guarda o{" "}
              <Button
                size="sm"
                variant="outline"
                onClick={async () => {
                  setEditingMealId(null);
                  setEditingCategoryId(null); // también cancelar edición de categoría
                  // await refreshMenu();
                }}
                className="bg-transparent border border-green-700 text-green-300 hover:bg-green-800"
              >
                Cancela
              </Button>{" "}
              antes de continuar.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
