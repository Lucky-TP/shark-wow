import { NextRequest, NextResponse } from "next/server";
import { auth } from "src/libs/firebase/firebaseAdmin";
import { UserIdTokenPayload } from "src/interfaces/payload/authPayload";
import { StatusCode } from "src/constants/statusCode";
import { errorHandler } from "src/utils/errors/errorHandler";
import { signUserSession } from "src/utils/cookie";
import { UserModel } from "src/interfaces/models/user";
import { createUser } from "src/databases/firestore/userDoc";
import { getDocAndSnapshot } from "src/databases/firestore/utils";
import { CollectionPath } from "src/constants/collection";

export async function POST(request: NextRequest) {
    try {
        const { userIdToken }: UserIdTokenPayload = await request.json();

        if (!userIdToken) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: StatusCode.UNAUTHORIZED }
            );
        }

        const decodedToken = await auth.verifyIdToken(userIdToken);
        const { snapshot: userSnapshot } = await getDocAndSnapshot(
            CollectionPath.USER,
            decodedToken.uid
        );

        if (!userSnapshot.exists) {
            const userData: Partial<UserModel> = {
                uid: decodedToken.uid,
                username: decodedToken.name,
                email: decodedToken.email || "",
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
        return errorHandler(error);
    }
}
