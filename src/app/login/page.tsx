"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const responseLogin = await signIn("credentials", {
        redirect: false,
        username: formData.get("username"),
        password: formData.get("password"),
      });
      console.log("Response from signIn:", responseLogin);
      if (responseLogin?.error) {
        setError(responseLogin.error as string);
        return;
      }
      if (responseLogin?.ok) router.push("/");
    } catch (error) {
      console.error("Error during login:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="w-76 md:w-96  mx-auto mt-10 bg-black/30 backdrop-blur-md border-none">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription className="card-foreground">
            Please enter your credentials to login.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  className="bg-gray-900"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  className="bg-gray-900"
                  id="password"
                  name="password"
                  placeholder="******"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              {error && <p className="text-red-500">{error}</p>}
              <Button className="bg-blue-500">Login</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
