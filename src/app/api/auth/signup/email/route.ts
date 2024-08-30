import { NextRequest, NextResponse } from "next/server";
import { DecodedIdToken } from "firebase-admin/auth";
import { auth } from "src/libs/firebase/firebaseAdmin";
import { createUser, deleteUser } from "src/libs/databases/users";
import { StatusCode } from "src/constants/statusCode";
import { UserModel } from "src/interfaces/models/user";
import { EmailSignUpPayload } from "src/interfaces/payload/authPayload";
import { extractBearerToken, signUserSession } from "src/utils/auth";
import { CustomError, errorHandler } from "src/libs/errors/apiError";

export async function POST(request: NextRequest) {
    let decodedToken: DecodedIdToken | null = null;
    try {
        const userIdToken = extractBearerToken(request);
        const body: EmailSignUpPayload = await request.json();
        decodedToken = await auth.verifyIdToken(userIdToken);

        // const salt = await genSalt(10);
        // const hashedPassword = await hash(body.password, salt);

        const userData: Partial<UserModel> = {
            uid: decodedToken.uid,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            birthDate: body.birthDate,
            address: [body.address],
        };

        await createUser(userData);
        await signUserSession(decodedToken);

        return NextResponse.json({ message: "Sign-in successful" }, { status: StatusCode.SUCCESS });
    } catch (error: unknown) {
        if (error instanceof Error || error instanceof CustomError) {
            if (decodedToken) {
                await auth.deleteUser(decodedToken.uid);
                await deleteUser(decodedToken.uid);
            }
        }
        return errorHandler(error);
    }
}
