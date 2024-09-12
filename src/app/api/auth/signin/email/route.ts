import { NextRequest, NextResponse } from "next/server";
import { auth } from "src/libs/firebase/firebaseAdmin";
import { errorHandler } from "src/libs/errors/apiError";
import { extractBearerToken, signUserSession } from "src/utils/api/auth";

/**
 * @swagger
 * /api/auth/signin/email:
 *   get:
 *     tags:
 *       - auth
 *     description: Sign in by email
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Authentication successful
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *
 */

export async function POST(request: NextRequest) {
    try {
        const userIdToken = extractBearerToken(request);
        const decodedToken = await auth.verifyIdToken(userIdToken);
        await signUserSession(decodedToken);

        return NextResponse.json({ message: "Authentication successful" }, { status: 200 });
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
