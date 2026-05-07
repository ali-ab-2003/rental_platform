import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;
  const isLoggedIn = !!token;

  const isOnAuthPage = pathname.startsWith("/login") || pathname.startsWith("/signup");
  const isProtectedRoute = pathname.startsWith("/messages");

  if (isOnAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Run middleware on all routes except static files, images, and favicon
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
