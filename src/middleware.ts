export { default } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const subdomain = host.split(".")[0];
  // Aquí puedes agregar lógica para manejar el subdominio si es necesario
  // Por ejemplo, podrías redirigir a una ruta específica según el subdominio
  if (subdomain === "la-k") {
    return NextResponse.rewrite(new URL("/la-k", request.url));
  }
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/register", "/master/:path*"],
};
