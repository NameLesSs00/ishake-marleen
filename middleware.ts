import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isMessagePage = request.nextUrl.pathname.startsWith("/message");

  if (isMessagePage) {
    const authCookie = request.cookies.get("guest-auth");

    if (!authCookie || authCookie.value !== "true") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/message/:path*"],
};
