import Image from "next/image";
import { ReactNode } from "react";

interface DecorativeFrameProps {
  children: ReactNode;
}
export default function DecorativeFrame({ children }: DecorativeFrameProps) {
  return (
    <div className="relative w-full h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Marco SVG - Fijo */}
      <Image
        src="/la-k/images/la-k-marco.svg"
        alt="Marco decorativo"
        fill
        className="object-contain pointer-events-none"
        priority
      />

      {/* Contenedor con scroll interno - Respeta el marco */}
      <div className="relative z-10 w-full h-full max-w-[min(90vw,800px)] max-h-[85vh] flex items-center justify-center">
        <div
          className="w-[85%] h-[75%] md:w-[70%] md:h-[85%] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
          style={{
            maxHeight: "calc(85vh - 4rem)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
