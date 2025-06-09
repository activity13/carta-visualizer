"use client";

import Axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";

export default function SignUp() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const processSignup = await Axios.post("/api/auth/signup", {
        fullName: formData.get("fullName"),
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
      });
      setSuccess(processSignup.data.message + processSignup.data.fullName);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          // The request was made and the server responded with a status code
          setError(error.response.data.error || "Error desconocido");
        } else if (error.request) {
          // The request was made but no response was received
          setError("No se recibió respuesta del servidor");
        } else {
          // Something happened in setting up the request that triggered an Error
          setError("Error al configurar la solicitud");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign-up Form</h1>
      <fieldset>
        <legend>Simple Signup Form</legend>
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Enter your full name"
          required
        />
        <label htmlFor="username">Username to login:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="******"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button className="bg-blue-500">Register User</button>
      </fieldset>
    </form>
  );
}
