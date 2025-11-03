"use client";

import { Languages } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative">
      <motion.button
        onClick={toggleLanguage}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileTap={{ scale: 0.9 }}
        animate={{
          backgroundColor:
            language === "es"
              ? "rgba(255,255,255,0.6)"
              : "rgba(230,245,255,0.7)",
          boxShadow: hovered
            ? "0 4px 15px rgba(0,0,0,0.1)"
            : "0 2px 6px rgba(0,0,0,0.05)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full",
          "backdrop-blur-md border border-gray-200 dark:border-gray-700",
          "transition-all duration-300"
        )}
      >
        <motion.div
          animate={{
            rotate: hovered ? 15 : 0,
            scale: hovered ? 1.15 : 1,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
        >
          <Languages className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        </motion.div>

        {/* Indicador de idioma */}
        <motion.div
          layout
          animate={{
            backgroundColor: language === "es" ? "#22c55e" : "#3b82f6",
          }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-1 right-1 w-2 h-2 rounded-full"
        />
      </motion.button>

      {/* Tooltip flotante */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          className="absolute top-12 right-1/2 -translate-y-30 px-2  text-xs font-medium text-gray-700 dark:text-gray-200 bg-white/90 dark:bg-gray-900/90 rounded-md border border-gray-100 dark:border-gray-700 shadow-md"
        >
          {language === "es" ? "Switch to English 🇺🇸" : "Cambiar a Español 🇪🇸"}
        </motion.div>
      )}
    </div>
  );
}
