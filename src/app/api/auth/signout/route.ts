import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "src/libs/errors/apiError";
import { StatusCode } from "src/constants/statusCode";
import { withAuthVerify, clearUserSession } from "src/utils/api/auth";

/**
 * @swagger
 * /api/auth/signout:
 *   get:
 *     tags:
 *       - auth
 *     description: Sign out 
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Clear authentication successful
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *
 */

export async function GET(request: NextRequest) {
    try {
        await withAuthVerify(request);
        await clearUserSession();
        return NextResponse.json(
            { message: "Clear authentication successful" },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
