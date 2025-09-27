import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const hostname = req.headers.get("host") || "";
    const currentHost = hostname.split(":")[0];
    const mainDomain = "viwcarta.com";

    // --- ROOT (landing page) ---
    if (currentHost === mainDomain || currentHost === "localhost") {
      if (url.pathname === "/") {
        return NextResponse.next(); // landing siempre pública
      }
    }

    // --- BACKOFFICE ---
    if (
      currentHost === `app.${mainDomain}` ||
      currentHost === "app.localhost"
    ) {
      if (
        url.pathname.startsWith("/backoffice/login") ||
        url.pathname.startsWith("/api/auth")
      ) {
        return NextResponse.next();
      }
      return NextResponse.next();
    }

    // --- RESTAURANTES ---
    if (
      currentHost !== "localhost" &&
      currentHost !== mainDomain &&
      !currentHost.startsWith("app.")
    ) {
      const subdomain = currentHost.replace(`.${mainDomain}`, "");
      url.pathname = `/${subdomain}${url.pathname}`;
      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const url = req.nextUrl;

        // acceso libre al landing y login
        if (
          url.pathname === "/" ||
          url.pathname.startsWith("/backoffice/login")
        ) {
          return true;
        }

        // para todo lo demás: requiere sesión
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    // Protegemos todas las rutas MENOS:
    // - archivos estáticos
    // - la raíz "/"
    "/((?!_next|.*\\..*|api/auth|$).*)",
  ],
};
