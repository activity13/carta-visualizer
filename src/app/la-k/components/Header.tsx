"use client";
import { useState, useEffect } from "react";
import { MapPin, Phone } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  restaurant: {
    id: string;
    name: string;
    slug: string;
    direction: string;
    location?: string;
    description: string;
    phone: string;
    image: string;
  };
}

export default function Header({ restaurant }: HeaderProps) {
  const { name, location, direction, description, phone, image } = restaurant;
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full transition-all duration-300 bg-white border-b border-gray-200
        ${scrolled ? "sticky top-0 z-50 shadow-md py-2" : "relative py-6"}
      `}
    >
      <div
        className={`max-w-5xl mx-auto px-4 flex items-center justify-center flex-col gap-3 transition-all duration-300
          ${scrolled ? "flex-row justify-between gap-4" : "flex-col"}
        `}
      >
        {/* Logo */}
        <div
          className={`relative rounded-full overflow-hidden ring-1 ring-gray-200 bg-white transition-all duration-300
            ${
              scrolled
                ? "w-10 h-10 shadow-sm"
                : "w-24 h-24 sm:w-28 sm:h-28 shadow-lg"
            }
          `}
        >
          <Image
            src={`/la-k/images/${image}`}
            alt={`Logo de ${name}`}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Nombre */}
        <h1
          className={`font-bold text-black text-center transition-all duration-300
            ${scrolled ? "text-base md:text-lg" : "text-2xl md:text-4xl"}
          `}
        >
          {name}
        </h1>

        {/* Descripción (solo visible sin scroll) */}
        {!scrolled && description && (
          <p className="text-gray-600 text-center text-sm sm:text-base max-w-xl leading-relaxed">
            {description}
          </p>
        )}

        {/* Datos de contacto (solo visibles sin scroll) */}
        {!scrolled && (
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm sm:text-base text-gray-700">
            {direction && (
              <a
                href={location || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-black transition-colors"
              >
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="truncate">{direction}</span>
              </a>
            )}
            {direction && phone && <span className="text-gray-300">•</span>}
            {phone && (
              <a
                href={`https://wa.me/${phone.replace(/\s/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-black transition-colors"
              >
                <Phone className="w-4 h-4 text-gray-500" />
                <span>{phone}</span>
              </a>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
