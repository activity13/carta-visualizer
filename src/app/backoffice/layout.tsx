import type { Metadata } from "next";
import NavBar from "@/components/ui/navBar";
import Providers from "../Providers";

export const metadata: Metadata = {
  title: "VIWCarta",
  description: "Administra tu carta con VIWCarta",
};

export default function BackOfficeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
