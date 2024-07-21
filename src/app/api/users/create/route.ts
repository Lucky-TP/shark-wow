import { NextRequest, NextResponse } from "next/server";
import { StatusCode } from "src/constants/statusCode";
import { addNewUser } from "src/databases/firestore/userDoc";
import { UserData } from "src/types/schema/user";
import { errorHandler } from "src/utils/errors/errorHandler";
import { withAuthAndVerify } from "src/utils/withAuth";

export async function POST(request: NextRequest) {
    try {
        const tokenData = await withAuthAndVerify(request);
        const { uid, name, profileImageUrl } = tokenData;
        const userData: UserData = {
            username: name,
            profileImageUrl: profileImageUrl,
            currentProjectIds: [],
            historicalProjectIds: [],
            supportProjects: [],
            favoriteProjectIds: [],
            agreement: false,
        };
        await addNewUser(uid, userData);
        return NextResponse.json(
            { message: "Create user successful" },
            { status: StatusCode.CREATED }
        );
    } catch (error: any) {
        return errorHandler(error);
    }
}
