import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth } from "src/libs/firebase/firebaseAdmin";
import { signToken } from "src/utils/jwt";
import { UserToken } from "src/interfaces/token";
import { SignInPayload } from "src/interfaces/payload/userPayload";
import { StatusCode } from "src/constants/statusCode";
import { USER_TOKEN } from "src/constants/cookiesKeyName";
import { errorHandler } from "src/utils/errors/errorHandler";
import { findOrCreateUser } from "src/utils/auth";

export async function POST(request: NextRequest) {
    try {
        const { userIdToken }: SignInPayload = await request.json();

        if (!userIdToken) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: StatusCode.UNAUTHORIZED }
            );
        }

        const decodedToken = await auth.verifyIdToken(userIdToken);
        const user = await findOrCreateUser(decodedToken);

        const tokenData: UserToken = {
            tokenId: userIdToken,
            uid: user.uid,
            name: user.username,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
        };
        const token = signToken(tokenData);
        cookies().set(USER_TOKEN, token, {
            maxAge: 60 * 60 * 24,
            httpOnly: true,
            path: "/",
        });

        return NextResponse.json(
            { message: "Authentication successful" },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: any) {
        errorHandler(error);
    }
}
