import { NextRequest, NextResponse } from "next/server";
import { auth } from "src/libs/firebase/firebaseAdmin";
import { getCollection } from "src/databases/firestore/utils";
import { createUser } from "src/databases/firestore/userDoc";
import { signUserSession } from "src/utils/cookie";
import { errorHandler } from "src/utils/errors/errorHandler";
import { CollectionPath } from "src/constants/collection";
import { StatusCode } from "src/constants/statusCode";
import { UserModel } from "src/interfaces/models/user";
import { EmailSignUpWithToken } from "src/interfaces/payload/authPayload";
import { milliToTimestamp } from "src/utils/dateFormat";

export async function POST(request: NextRequest) {
    try {
        const body: EmailSignUpWithToken = await request.json();

        const { userIdToken } = body;
        const decodedToken = await auth.verifyIdToken(userIdToken);
        const userColletion = getCollection(CollectionPath.USER);

        const querySnapshot = await userColletion
            .where("email", "==", body.email)
            .get();
        if (!querySnapshot.empty) {
            return NextResponse.json(
                { message: "Email aleready used" },
                { status: StatusCode.ALREADY_EXISTS }
            );
        }

        // const salt = await genSalt(10);
        // const hashedPassword = await hash(body.password, salt);

        const userData: Partial<UserModel> = {
            uid: decodedToken.uid,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            birthDate: milliToTimestamp(body.birthDate),
            address: [body.address],
        };

        await createUser(userData);
        signUserSession(decodedToken);

        return NextResponse.json(
            { message: "Sign-in successful" },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: any) {
        console.log(error);
        return errorHandler(error);
    }
}
