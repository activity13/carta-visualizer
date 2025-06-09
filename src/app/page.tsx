import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
        <p className="text-lg">This is the main page of the application.</p>
      </div>
      <div>
        <Link href={"/dashboard"}>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </>
  );
}
