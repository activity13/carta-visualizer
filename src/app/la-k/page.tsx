"use client";

import React, { use, useEffect } from "react";
import Axios from "axios";
import LaKarta from "./components/Karta";

export default function LaK() {
  const getData = async () => {
    try {
      const subdomain = "la-k"; // Cambia esto según la subdama que quieras probar
      const res = await Axios.get(
        `${window.location.origin}/api/public/menu/${subdomain}`
      );
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Bienvenido a La K</h1>
      <LaKarta />
    </div>
  );
}
