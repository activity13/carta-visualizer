import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to CV</h1>
      <p className="text-lg mb-4">This is a simple Next.js application.</p>
      <Link href="/master" className="text-blue-500 hover:underline">
        Go to product manager
      </Link>
    </main>
  );
}
