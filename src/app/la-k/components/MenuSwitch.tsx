"use client";

import { Pizza, Utensils } from "lucide-react";

type MenuType = "principal" | "pizzas";

interface MenuSwitchProps {
  activeMenu: MenuType;
  onChange: (menu: MenuType) => void;
}

export default function MenuSwitch({ activeMenu, onChange }: MenuSwitchProps) {
  return (
    <div className="sticky flex justify-center top-0 z-40 ">
      <div className="container  w-2xl mx-auto px-4 py-3">
        <div className="flex gap-2 max-w-md mx-auto">
          {/* Botón Carta Principal */}
          <button
            onClick={() => onChange("principal")}
            className={`
              flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-200
              ${
                activeMenu === "principal"
                  ? "bg-black text-white shadow-lg"
                  : "bg-white text-gray-700 border-2 border-gray-300 hover:border-black"
              }
            `}
          >
            <Utensils className="w-4 h-4" />
            <span className="hidden sm:inline">Carta Principal</span>
            <span className="sm:hidden">Principal</span>
          </button>

          {/* Botón Carta Pizzas */}
          <button
            onClick={() => onChange("pizzas")}
            className={`
              flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-200
              ${
                activeMenu === "pizzas"
                  ? "bg-black text-white shadow-lg"
                  : "bg-white text-gray-700 border-2 border-gray-300 hover:border-black"
              }
            `}
          >
            <Pizza className="w-4 h-4" />
            Pizzas
          </button>
        </div>
      </div>
    </div>
  );
}
