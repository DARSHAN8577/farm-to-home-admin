import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Public routes
    if (
        pathname.startsWith("/download") ||
        pathname.startsWith("/apk") ||
        pathname.startsWith("/api")
    ) {
        return NextResponse.next();
    }

    // Password protection
    const auth = request.cookies.get("admin_auth");

    if (!auth || auth.value !== "farmtohome_secure_2026") {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|favicon.ico).*)"],
};