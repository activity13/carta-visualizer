"use client";

import { useSession } from "next-auth/react";
export default function Dashboard() {
  const { data: session, status } = useSession();

  console.log(session, status);
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg">Welcome to the dashboard page!</p>
    </div>
  );
}
