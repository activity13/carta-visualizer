import Master from "@/components/ui/master";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <>
      <section className="flex flex-col items-center  gap-6 p-4">
        <h1 className="text-4xl font-bold">Bienvenido</h1>
        <Button
          className="
    w-full max-w-lg
    bg-green-900
    border border-green-800
    shadow-md
    text-2xl font-semibold tracking-wide uppercase
    text-white
    py-4 px-6
    rounded-xl
    transition-all duration-150
    hover:bg-green-800
    hover:text-green-300
    focus:outline-none focus:ring-2 focus:ring-green-700
  "
        >
          <span>Elige tus categorías aquí</span>
        </Button>
        <Master />
      </section>
    </>
  );
}
