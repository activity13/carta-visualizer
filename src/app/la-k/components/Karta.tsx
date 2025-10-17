"use client";

import { useState } from "react";
import { Pizza, Utensils } from "lucide-react";
import DecorativeFrame from "./DecorativeBorder";
import MenuSwitch from "./MenuSwitch"; // 👈 Importamos el nuevo componente
import Image from "next/image";

interface Meal {
  id: string;
  name: string;
  price: number;
  description?: string;
  ingredients?: string[];
}

interface Category {
  id: string;
  name: string;
  meals: Meal[];
  description?: string;
}

interface KartaData {
  categories: Category[];
}

interface KartaProps {
  data: KartaData;
}

type MenuType = "principal" | "pizzas";

export default function LaKarta({ data }: KartaProps) {
  const [activeMenu, setActiveMenu] = useState<MenuType>("principal");

  const filteredCategories = data.categories.filter((category) => {
    const categoryName = category.name.toLowerCase();
    return activeMenu === "pizzas"
      ? categoryName.includes("pizza")
      : !categoryName.includes("pizza");
  });

  const half = Math.ceil(filteredCategories.length / 2);
  const left = filteredCategories.slice(0, half);
  const right = filteredCategories.slice(half);

  return (
    <div className="w-full min-h-screen">
      {/* ✅ Componente separado */}
      <MenuSwitch activeMenu={activeMenu} onChange={setActiveMenu} />
      {/* Grupo de botones que te permiten desplazarte comodamente por las categorias en la versión para móvil */}
      <div className="fixed bottom-0 left-0 w-full z-50 border-t border-black bg-neutral-50 shadow-inner overflow-x-auto md:hidden">
        <div className="flex gap-3 px-4 py-3 min-w-full overflow-x-auto scrollbar-none">
          {filteredCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                const target = document.getElementById(
                  category.name.toLowerCase().replace(/\s+/g, "-")
                );
                if (target) {
                  target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="whitespace-nowrap px-4 py-2 text-sm uppercase tracking-wider text-black font-semibold border border-black rounded-md bg-white shadow-sm active:scale-95 active:bg-black active:text-white transition-all duration-150"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      <DecorativeFrame>
        {/* Contenedor del menú dentro del marco */}
        <div className="w-full max-w-full md:max-w-4xl mx-auto p-4 md:p-6 overflow-x-hidden">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
                {activeMenu === "pizzas" ? (
                  <Pizza className="w-8 h-8 text-gray-400" />
                ) : (
                  <Utensils className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <p className="text-gray-500 text-lg font-medium">
                No hay categorías disponibles en esta carta
              </p>
            </div>
          ) : (
            <div
              className={`space-y-8 -order-1 flex-1 ${
                activeMenu === "pizzas"
                  ? "grid grid-cols-1 md:grid-cols-1 gap-4"
                  : "grid grid-cols-1 md:grid-cols-2 gap-2"
              } `}
            >
              {activeMenu === "pizzas" ? (
                <div className="flex flex-col space-y-8">
                  {filteredCategories.map((category) => (
                    <div
                      key={category.id}
                      id={category.name.toLowerCase().replace(/\s+/g, "-")}
                    >
                      <div>
                        {category.name === "Pizzas" && (
                          <div className="flex py-6  lg:mb-10 justify-center text-center flex-col items-center">
                            <Image
                              src="/la-k/images/pizzas-la-k-title.svg"
                              alt="Carta de pizzas la k vichayito"
                              width={100}
                              height={100}
                            />
                            <h3 className="text-sm md:text-2xl">
                              Tamaño familiar masa delgada
                            </h3>
                          </div>
                        )}
                        {category.description && (
                          <p className="whitespace-pre-line text-center text-xs md:text-4xl text-gray-600 mb-4">
                            {category.description}
                          </p>
                        )}
                      </div>

                      {/* Lista de platos */}
                      <div className=" lg:p-10">
                        {category.meals.map((meal) => (
                          <div
                            key={meal.id}
                            className="flex items-start justify-between gap-4 group leading-none active:scale-95 active:bg-gray-100 transition-transform duration-150"
                          >
                            <div className="flex-1 md:flex md:flex-row">
                              <h5 className="text-[0.80rem] md:text-lg text-gray-900 uppercase tracking-wide leading-tight m-0 p-0 whitespace-nowrap">
                                {meal.name}
                              </h5>
                              {meal.description && (
                                <p className="flex text-[0.7rem] md:text-xs text-gray-600 leading-relaxed uppercase">
                                  {meal.description}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <span className="text-[0.80rem] md:text-lg text-gray-900 uppercase tracking-wide leading-tight whitespace-nowrap">
                                S/ {meal.price.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {category.name === "Pizzas" && (
                        <div className="flex mt-4 sm:mt-20 p-6 justify-center text-center flex-col items-center">
                          <Image
                            src="/la-k/images/la-k-footer-divider.svg"
                            alt="Carta de pizzas la k vichayito"
                            width={100}
                            height={100}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {/* Columna izquierda */}
                  <div className="flex flex-col space-y-8">
                    {left.map((category) => (
                      <div
                        key={category.id}
                        id={category.name.toLowerCase().replace(/\s+/g, "-")}
                      >
                        {category.name !== "Salsas" && (
                          <div>
                            <h2 className="text-center text-xs font-bold uppercase tracking-wider text-gray-900">
                              {category.name}
                            </h2>
                            <div className="flex justify-center mb-4">
                              <Image
                                src="/la-k/images/la-k-divider.svg"
                                alt="Carta de pizzas la k vichayito"
                                width={250}
                                height={125}
                              />
                            </div>
                          </div>
                        )}
                        {category.description && (
                          <p className="whitespace-pre-line text-start text-xs text-gray-600">
                            {category.description}
                          </p>
                        )}

                        {/* Lista de platos */}
                        <div>
                          {category.meals.map((meal) => (
                            <div
                              key={meal.id}
                              className="flex items-start justify-between gap-4 group leading-none active:scale-95 active:bg-gray-100 transition-transform duration-150"
                            >
                              <div className="flex-1">
                                <h5 className="text-[0.80rem]  text-gray-900 uppercase tracking-wide leading-tight m-0 p-0">
                                  {meal.name}
                                </h5>
                                {meal.description && (
                                  <p className="text-[0.7rem] text-gray-600 leading-relaxed">
                                    {meal.description}
                                  </p>
                                )}
                              </div>
                              <div className="text-right">
                                <span className="text-[0.80rem] text-gray-900 uppercase tracking-wide leading-tight">
                                  S/ {meal.price.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Columna derecha */}
                  <div className="flex flex-col space-y-8">
                    {right.map((category) => (
                      <div
                        key={category.id}
                        id={category.name.toLowerCase().replace(/\s+/g, "-")}
                      >
                        {category.name !== "Salsas" && (
                          <div>
                            <h2 className="text-center text-xs font-bold uppercase tracking-wider text-gray-900">
                              {category.name}
                            </h2>
                            <div className="flex justify-center mb-4">
                              <Image
                                src="/la-k/images/la-k-divider.svg"
                                alt="Carta de pizzas la k vichayito"
                                width={250}
                                height={125}
                              />
                            </div>
                          </div>
                        )}
                        {category.description && (
                          <p className="whitespace-pre-line text-start text-xs text-gray-600">
                            {category.description}
                          </p>
                        )}

                        {/* Lista de platos */}
                        <div>
                          {category.meals.map((meal) => (
                            <div
                              key={meal.id}
                              className="flex items-start justify-between gap-4 group leading-none active:scale-95 active:bg-gray-100 transition-transform duration-150"
                            >
                              <div className="flex-1">
                                <h5 className="text-[0.80rem]  text-gray-900 uppercase tracking-wide leading-tight m-0 p-0">
                                  {meal.name}
                                </h5>
                                {meal.description && (
                                  <p className="text-[0.7rem] text-gray-600 leading-relaxed">
                                    {meal.description}
                                  </p>
                                )}
                              </div>
                              <div className="text-right">
                                <span className="text-[0.80rem] text-gray-900 uppercase tracking-wide leading-tight">
                                  S/ {meal.price.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </DecorativeFrame>
    </div>
  );
}
