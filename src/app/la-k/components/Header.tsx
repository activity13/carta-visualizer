import { MapPin, Phone, Info } from "lucide-react";
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

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm backdrop-blur-md border-b border-gray-100">
      {/* Contenedor principal */}
      <div className="max-w-6xl mx-auto px-5 py-5 flex flex-col items-center gap-2 sm:gap-1">
        {/* Logo */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full shadow-lg overflow-hidden ring-1 ring-gray-200 hover:scale-105 transition-transform duration-300">
          <Image
            src={`/la-k/images/${image}`}
            alt={`Logo de ${name}`}
            fill
            className="object-contain bg-white"
            priority
          />
        </div>

        {/* Nombre */}
        <h1 className="text-2xl md:text-4xl font-bold text-black tracking-tight text-center relative">
          {name}
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-black to-transparent opacity-30" />
        </h1>

        {/* Descripción */}
        {description && (
          <p className="text-gray-600 text-center text-sm sm:text-base max-w-xl leading-relaxed">
            {description}
          </p>
        )}

        {/* Datos de contacto */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm sm:text-base text-gray-700">
          {/* Dirección */}
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

          {/* Separador */}
          {direction && phone && <span className="text-gray-300">•</span>}

          {/* Teléfono */}
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
      </div>
    </header>
  );
}
