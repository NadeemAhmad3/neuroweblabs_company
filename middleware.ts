import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback_secret_please_change_in_production"
);

export async function middleware(req: NextRequest) {
  // If accessing /admin, check for cookie
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const token = req.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin-login", req.url));
    }

    try {
      // Verify token
      const { payload } = await jwtVerify(token, JWT_SECRET);
      
      // Checking for basic admin role expectation
      if (payload.role !== "admin") {
        return NextResponse.redirect(new URL("/admin-login", req.url));
      }

      return NextResponse.next();
    } catch (error) {
      // Token is invalid/expired
      return NextResponse.redirect(new URL("/admin-login", req.url));
    }
  }

  // Also protect the /api/admin paths except /login
  if (
    req.nextUrl.pathname.startsWith("/api/admin") && 
    !req.nextUrl.pathname.startsWith("/api/admin/login")
  ) {
    const token = req.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
