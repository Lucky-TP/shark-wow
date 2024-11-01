import { NextRequest, NextResponse } from "next/server";
import { DecodedIdToken } from "firebase-admin/auth";
import { auth } from "src/libs/firebase/firebaseAdmin";
import { createUser, deleteUser, getUser } from "src/libs/databases/firestore/users";
import { getDocRef } from "src/libs/databases/firestore/commons";
import { clearUserSession, extractBearerToken, signUserSession } from "src/utils/api/auth";
import { UserModel } from "src/interfaces/models/user";
import { StatusCode } from "src/constants/statusCode";
import { CollectionPath } from "src/constants/firestore";
import { errorHandler, CustomError } from "src/libs/errors/apiError";

/**
 * @swagger
 * /api/auth/signin/google:
 *   post:
 *     tags:
 *       - auth
 *     description: Sign in using Google OAuth with Bearer token authentication in the Authorization header.
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

        const userDocRef = getDocRef(CollectionPath.USER, decodedToken.uid);
        const userSnapshot = await userDocRef.get();
        if (!userSnapshot.exists) {
            const userModel: Partial<UserModel> = {
                uid: decodedToken.uid,
                username: decodedToken.name,
                email: decodedToken.email,
                profileImageUrl: decodedToken.picture || "",
                contact: {
                    facebook: "",
                    X: "",
                    youtube: "",
                    phone: decodedToken.phone_number || "",
                },
                agreement: true,
            };
            await createUser(userModel);
        }
        const retrivedUserModel = await getUser(decodedToken.uid);
        await signUserSession({
            uid: retrivedUserModel.uid,
            email: retrivedUserModel.email,
            role: retrivedUserModel.role,
        });
        return NextResponse.json(
            { message: "Authentication successful" },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        // if (error instanceof Error || error instanceof CustomError) {
        //     if (decodedToken) {
        //         await auth.deleteUser(decodedToken.uid);
        //         await deleteUser(decodedToken.uid);
        //     }
        //     await clearUserSession();
        // }
        return errorHandler(error);
    }
}
