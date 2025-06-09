"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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
    <form onSubmit={handleSubmit}>
      <h1>Login Form</h1>
      <fieldset>
        <legend>Login Form</legend>
        <label htmlFor="username">Username or email to login:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="******"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button className="bg-blue-500">Login</button>
      </fieldset>
    </form>
  );
}
