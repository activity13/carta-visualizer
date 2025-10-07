import LaKarta from "./components/Karta";

export const dynamic = "force-static";
export const revalidate = 60; // revalida cada minuto o al revalidateTag()

export default async function LaK() {
  const subdomain = "la-k";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/public/menu/${subdomain}`, {
    next: { tags: [`menu-${subdomain}`] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch menu");
  }

  const data = await res.json();

  return (
    <div>
      <h1>Bienvenido a {data.restaurant.name}</h1>
      <LaKarta data={data} />
    </div>
  );
}
