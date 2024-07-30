import { NextRequest, NextResponse } from "next/server";
import { StatusCode } from "src/constants/statusCode";
import { addNewUser } from "src/databases/firestore/userDoc";
import { UserModel } from "src/interfaces/models/user";
import { errorHandler } from "src/utils/errors/errorHandler";
import { withAuthVerify } from "src/utils/withAuth";

export async function POST(request: NextRequest) {
    try {
        const tokenData = await withAuthVerify(request);
        const { uid, name, profileImageUrl, email } = tokenData;
        const [firstName, lastName] = name.split(" ");

        const newUser: UserModel = {
            uid,
            username: email?.split("@")[0] || "",
            firstName: firstName || "",
            lastName: lastName || "",
            aboutMe: "",
            email: email || "",
            profileImageUrl,
            ownProjectIds: [],
            favoriteProjectIds: [],
            popularDetail: {
                totalProjectSuccess: 0,
                totalSupporter: 0,
            },
            receivedComments: [],
            interestCategories: [],
            address: {
                country: "",
                city: "",
                province: "",
                postalCode: "",
            },
            contact: {
                facebook: "",
                X: "",
                youtube: "",
                phone: "",
            },
            cvUrl: "",
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
