import { NextRequest, NextResponse } from "next/server";
import { StatusCode } from "src/constants/statusCode";
import { addNewUser } from "src/databases/firestore/userDoc";
import { UserModel } from "src/interfaces/models/user";
import { errorHandler } from "src/utils/errors/errorHandler";
import { withAuthAndVerify } from "src/utils/withAuth";

export async function POST(request: NextRequest) {
    try {
        const tokenData = await withAuthAndVerify(request);
        const { uid, name, profileImageUrl, email } = tokenData;
        const [firstName, lastName] = name.split(" ");
        const newUser: UserModel = {
            uid,
            firstName: firstName || "",
            lastName: lastName || "",
            email: email || "",
            role: "user",
            profileImageUrl,
            myProjectIds: [],
            favoriteProjectIds: [],
            receivedComments: [],
            transactionLogs: [],
            agreement: false,
        };

        await addNewUser(newUser);
        return NextResponse.json(
            { message: "Create user successful" },
            { status: StatusCode.CREATED }
        );
    } catch (error: any) {
        return errorHandler(error);
    }
}
