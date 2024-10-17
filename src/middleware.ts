import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { pagePath } from "src/constants/routePath";
import { USER_TOKEN } from "src/constants/cookiesKeyName";
import { withAuthVerify } from "./utils/api/auth";
import { UserRole } from "./interfaces/models/enums";

const publicPaths = [pagePath.ROOT, pagePath.SIGNIN];
const privatePaths = [pagePath.PROFILE];
const adminPaths = ["/admin"]; // Admin route prefix

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const isPublicPath = publicPaths.includes(pathname);
    const isPrivatePath = privatePaths.includes(pathname);
    const isAdminPath = adminPaths.some((path) => pathname.startsWith(path)); // Check if it starts with /admin
    const token = request.cookies.get(USER_TOKEN)?.value || "";

    console.log(`Middleware triggered for path: ${pathname}`);

    // If it's a private path and user has no token, redirect to signin
    if (!token && isPrivatePath) {
        console.warn(`Redirecting to sign-in from private path: ${pathname}`);
        return NextResponse.redirect(new URL(pagePath.SIGNIN, request.nextUrl));
    }

    // If the path starts with /admin, perform role verification
    if (isAdminPath) {
        console.log(`Admin path access attempt for: ${pathname}`);

        if (!token) {
            console.warn(`Redirecting to sign-in from admin path: ${pathname} (no token)`);
            return NextResponse.redirect(new URL(pagePath.SIGNIN, request.nextUrl));
        }

        try {
            const userToken = await withAuthVerify(request); // Verify the token
            // Assuming you have some logic in `withAuthVerify` to extract user roles
            if (userToken.role !== UserRole.ADMIN) {
                console.warn(`Access denied for non-admin user on admin path: ${pathname}`);
                return NextResponse.redirect(new URL(pagePath.ROOT, request.nextUrl)); // Redirect if not admin
            }
            console.log(`Admin access granted for user: ${userToken.uid}`);
        } catch (error) {
            console.error("JWT verification failed", error);
            return NextResponse.redirect(new URL(pagePath.SIGNIN, request.nextUrl)); // Redirect to signin on error
        }
    }

    console.log(`Middleware passed for path: ${pathname}`);
    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/signin", "/profile", "/admin/:path*"], // Add a matcher for admin paths
};
