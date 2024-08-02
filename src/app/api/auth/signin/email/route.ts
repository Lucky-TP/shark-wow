import { NextRequest, NextResponse } from "next/server";
import { UserIdTokenPayload } from "src/interfaces/payload/authPayload";
import { auth } from "src/libs/firebase/firebaseAdmin";
import { signUserSession } from "src/utils/cookie";
import { errorHandler } from "src/utils/errors/errorHandler";

export async function POST(request: NextRequest) {
    try {
        const { userIdToken }: UserIdTokenPayload = await request.json();
        const decodedToken = await auth.verifyIdToken(userIdToken);
        signUserSession(decodedToken);

        return NextResponse.json(
            { message: "Authentication successful" },
            { status: 200 }
        );
    } catch (error: any) {
        return errorHandler(error);
    }
}
