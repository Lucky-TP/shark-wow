import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { pagePath } from "src/constants/routePath";
import { USER_TOKEN } from "src/constants/cookiesKeyName";

const publicPaths = [pagePath.ROOT, pagePath.SIGNIN];

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const isPublicPath = publicPaths.includes(pathname);
    const token = request.cookies.get(USER_TOKEN)?.value || "";

    // if (token && isPublicPath) {
    //     return NextResponse.redirect(
    //         new URL(pagePath.PROFILE, request.nextUrl)
    //     );
    // }

    // if (!token && !isPublicPath) {
    //     return NextResponse.redirect(new URL(pagePath.SIGNIN, request.nextUrl));
    // }

    // try {
    //     const { payload } = await jwtVerify(token, secret);
    // } catch (error) {
    //     console.error("JWT verification failed", error);
    //     return NextResponse.redirect(new URL(page.LOGIN, request.nextUrl));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/signin", "/profile"],
};
