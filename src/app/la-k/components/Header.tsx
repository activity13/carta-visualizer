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
      {/* Espacio reservado para evitar solapamiento */}
      <div className={`${scrolled ? "h-20" : "h-10 sm:h-40"}`} />

      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
          ${scrolled ? "bg-transparent" : "bg-transparent"}
        `}
      >
        <div
          className={`max-w-5xl mx-auto flex items-center transition-all duration-500 px-4
            ${scrolled ? "justify-start" : "justify-start sm:justify-center"}
          `}
        >
          <div
            className={`relative overflow-hidden rounded-full bg-white ring-1 ring-gray-200 shadow-md transition-all duration-500
              ${
                scrolled
                  ? "w-14 h-14 sm:w-16 sm:h-16 translate-y-0"
                  : "w-20 h-20 sm:w-28 sm:h-28 sm:translate-y-8"
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
