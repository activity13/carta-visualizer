import Header from "./components/Header";
import PlatoDelDia from "./components/PlatoDelDia";
import LaKarta from "./components/Karta";
import WhatsAppButton from "./components/WhatsappButton";

export const dynamic = "force-static";
export const revalidate = 60; // revalida cada minuto o al revalidateTag()

export default async function LaK() {
  const subdomain = "la-k";
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/public/menu/${subdomain}`, {
    next: { tags: [`menu-${subdomain}`] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch menu");
  }

  const data = await res.json();
  console.log("🚀 ~ page.tsx:21 ~ LaK ~ data:", data);

  // Encontramos la categoría "Plato del día"
  const platoDelDiaCategory = data?.categories?.find(
    (cat: any) => cat.name.toLowerCase() === "plato del día"
  );

  // Aseguramos que tenga al menos un plato
  const platoDelDia = platoDelDiaCategory?.meals?.[0];
  return (
    <div>
      <Header restaurant={data.restaurant} />
      {/* {platoDelDia && (
        <PlatoDelDia
          name={platoDelDia.name}
          description={platoDelDia.shortDescription || platoDelDia.description}
          price={platoDelDia.price}
          ingredients={platoDelDia.ingredients}
        />
      )} */}
      <LaKarta data={data} />
      <WhatsAppButton restaurant={data.restaurant} />
    </div>
  );
}
