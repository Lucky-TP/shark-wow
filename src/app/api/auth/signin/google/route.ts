import { NextRequest, NextResponse } from "next/server";
import { DecodedIdToken } from "firebase-admin/auth";
import { auth } from "src/libs/firebase/firebaseAdmin";
import { createUser } from "src/databases/firestore/userDoc";
import { getDocAndSnapshot } from "src/databases/firestore/utils";
import { signUserSession } from "src/utils/cookie";
import { UserIdTokenPayload } from "src/interfaces/payload/authPayload";
import { UserModel } from "src/interfaces/models/user";
import { StatusCode } from "src/constants/statusCode";
import { CollectionPath } from "src/constants/collection";
import { errorHandler } from "src/utils/errors/errorHandler";
import { CustomError } from "src/utils/errors/customError";

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
        const { snapshot: userSnapshot } = await getDocAndSnapshot(
            CollectionPath.USER,
            decodedToken.uid
        );
        console.log(decodedToken.email);

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
    } catch (error: any) {
        if (error instanceof Error || error instanceof CustomError) {
            if (decodedToken) {
                await auth.deleteUser(decodedToken.uid);
            }
        }
        return errorHandler(error);
    }
}
