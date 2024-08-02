import { NextRequest, NextResponse } from "next/server";
import { auth } from "src/libs/firebase/firebaseAdmin";
import { UserIdTokenPayload } from "src/interfaces/payload/authPayload";
import { StatusCode } from "src/constants/statusCode";
import { errorHandler } from "src/utils/errors/errorHandler";
import { createUser } from "src/databases/firestore/userDoc";
import { signUserSession } from "src/utils/cookie";
import { getUser } from "src/databases/firestore/userDoc";
import { UserModel } from "src/interfaces/models/user";

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
        const existsUser = await getUser(decodedToken.uid);

        if (!existsUser) {
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
