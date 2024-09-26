import { NextRequest, NextResponse } from "next/server";
import { auth } from "src/libs/firebase/firebaseAdmin";
import { errorHandler } from "src/libs/errors/apiError";
import { extractBearerToken, signUserSession } from "src/utils/api/auth";
import { getUser } from "src/libs/databases/firestore/users";

/**
 * @swagger
 * /api/auth/signin/email:
 *   post:
 *     tags:
 *       - auth
 *     description: Sign in using an email address with Bearer token authentication in the Authorization header.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *             required:
 *               - email
 *               - password
 *     security:
 *       - BearerAuth: []  # Requires Bearer token for authentication
 *     responses:
 *       200:
 *         description: Authentication successful. User is signed in and receives a token.
 *       500:
 *         description: Internal server error - Something went wrong during authentication.
 */

export async function POST(request: NextRequest) {
    try {
        const userIdToken = extractBearerToken(request);
        const decodedToken = await auth.verifyIdToken(userIdToken);
        const retrivedUserModel = await getUser(decodedToken.uid);
        await signUserSession({ uid: retrivedUserModel.uid, role: retrivedUserModel.role });

        return NextResponse.json({ message: "Authentication successful" }, { status: 200 });
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
