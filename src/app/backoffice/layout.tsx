import type { Metadata } from "next";
import Providers from "../Providers";
import NavBarWrapper from "@/components/ui/NavBarWrapper";
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
          <NavBarWrapper />
          {children}
        </Providers>
      </body>
    </html>
  );
}
