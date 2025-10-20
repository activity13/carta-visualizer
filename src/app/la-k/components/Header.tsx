"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface HeaderProps {
  restaurant: {
    id: string;
    name: string;
    image: string;
  };
}

export default function Header({ restaurant }: HeaderProps) {
  const { name, image } = restaurant;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Espacio reservado arriba para evitar que la carta quede detrás del header */}
      <div className={`${scrolled ? "h-20" : "h-36 sm:h-40"}`} />

      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
          ${scrolled ? "bg-transparent" : "bg-transparent"}
        `}
      >
        <div
          className={`max-w-5xl mx-auto flex items-center transition-all duration-500 px-4
            ${scrolled ? "justify-start" : "justify-center"}
          `}
        >
          <div
            className={`relative overflow-hidden rounded-full bg-white ring-1 ring-gray-200 shadow-md transition-all duration-500
              ${
                scrolled
                  ? "w-16 h-16 sm:w-20 sm:h-20 translate-y-0"
                  : "w-28 h-28 sm:w-36 sm:h-36 translate-y-8"
              }
            `}
          >
            <Image
              src={`/la-k/images/${image}`}
              alt={`Logo de ${name}`}
              fill
              className="object-contain p-1"
              priority
            />
          </div>
        </div>
      </header>
    </>
  );
}
