import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center  p-21 text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome</h1>
        <Button
          className="mt-[10%] btn-outline border-2 border-green-900"
          variant="link"
        >
          <Link href="/master" className="text-white hover:underline">
            Go to product manager
          </Link>
        </Button>
      </main>
    </>
  );
}
