import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth } from "src/libs/firebase/firebaseAdmin";
import { signToken } from "src/utils/jwt";
import { withAuth } from "src/utils/withAuth";
import { UserToken } from "src/interfaces/token";
import { SignTokenPayload } from "src/interfaces/payload";
import { StatusCode } from "src/constants/statusCode";
import { USER_TOKEN } from "src/constants/cookiesKeyName";
import { errorHandler } from "src/utils/errors/errorHandler";

export async function POST(request: NextRequest) {
    try {
        const { userIdToken }: SignTokenPayload = await request.json();

        if (!userIdToken) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: StatusCode.UNAUTHORIZED }
            );
        }

        const decodedToken = await auth.verifyIdToken(userIdToken);
        const tokenData: UserToken = {
            tokenId: userIdToken,
            uid: decodedToken.uid,
            name: decodedToken.name,
            email: decodedToken.email,
            profileImageUrl: decodedToken.picture,
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

export async function GET(request: NextRequest) {
    try {
        await withAuth(request);
        const cookieStore = cookies();
        cookieStore.getAll().forEach(({ name }) => cookieStore.delete(name));
        return NextResponse.json(
            { message: "Clear authentication successful" },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: any) {
        errorHandler(error);
    }
}