import React from "react";

const BrandBook: React.FC = () => {
  return (
    <div className="p-8 bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold mb-4">CartaMímica Brand Book</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Colores</h2>
        <div className="flex space-x-4">
          <div className="w-20 h-20 bg-[#041b15]"></div>
          <div className="w-20 h-20 bg-[#228B22]"></div>
          <div className="w-20 h-20 bg-[#FFD700]"></div>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Fuentes</h2>
        <p className="font-sans text-xl">Sans: Roboto</p>
        <p className="font-serif text-xl">Serif: Merriweather</p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold">Logo</h2>
        <div className="bg-[#041b15] text-white px-4 py-2 rounded">
          Placeholder Logo CartaMímica
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Tagline</h2>
        <p>Imita tu carta física en digital.</p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold">Misión</h2>
        <p>Digitalizar menús personalizados para restaurantes locales.</p>
      </section>
    </div>
  );
};

export default BrandBook;
