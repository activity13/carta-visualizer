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
        return NextResponse.next();
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
    let subdomain = "";
    if (currentHost.endsWith(mainDomain)) {
      subdomain = currentHost.replace(`.${mainDomain}`, "");
    } else if (currentHost.endsWith("localhost")) {
      subdomain = currentHost.replace(".localhost", "");
    }

    if (
      subdomain &&
      url.pathname !== `/${subdomain}` &&
      !url.pathname.startsWith(`/${subdomain}/`)
    ) {
      url.pathname = `/${subdomain}${url.pathname}`;
      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const url = req.nextUrl;
        // Permite acceso público a todo menos backoffice
        if (url.pathname.startsWith("/backoffice")) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!_next|.*\\..*|api/auth).*)"],
};
