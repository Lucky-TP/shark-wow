import { NextRequest, NextResponse } from "next/server";
import { DecodedIdToken } from "firebase-admin/auth";
import { auth } from "src/libs/firebase/firebaseAdmin";
import { createUser } from "src/libs/databases/users";
import { getDocRef } from "src/libs/databases/firestore";
import { signUserSession } from "src/utils/auth";
import { UserIdTokenPayload } from "src/interfaces/payload/authPayload";
import { UserModel } from "src/interfaces/models/user";
import { StatusCode } from "src/constants/statusCode";
import { CollectionPath } from "src/constants/firestore";
import { errorHandler, CustomError } from "src/libs/errors/apiError";

export async function POST(request: NextRequest) {
    let decodedToken: DecodedIdToken | null = null;
    try {
        const { userIdToken }: UserIdTokenPayload = await request.json();

        if (!userIdToken) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: StatusCode.UNAUTHORIZED }
            );
        }

        decodedToken = await auth.verifyIdToken(userIdToken);
        const userDocRef = getDocRef(CollectionPath.USER, decodedToken.uid);
        const userSnapshot = await userDocRef.get();

        if (!userSnapshot.exists) {
            const userData: Partial<UserModel> = {
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
            await createUser(userData);
        }

        signUserSession(decodedToken);
        return NextResponse.json(
            { message: "Authentication successful" },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        if (error instanceof Error || error instanceof CustomError) {
            if (decodedToken) {
                await auth.deleteUser(decodedToken.uid);
            }
        }
        return errorHandler(error);
    }
}
