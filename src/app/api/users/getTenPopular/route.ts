import { NextRequest, NextResponse } from "next/server";
import { StatusCode } from "src/constants/statusCode";
import { CollectionPath } from "src/constants/firestore";
import { getCollectionRef } from "src/libs/databases/firestore";
import { UserModel } from "src/interfaces/models/user";
import { PopularCreator } from "src/interfaces/models/common";
import { errorHandler } from "src/libs/errors/apiError";

export async function GET(request: NextRequest) {
    try {
        const userCollection = getCollectionRef(CollectionPath.USER);
        const topTenCreator = await userCollection
            .orderBy("popularDetail.totalProjectSuccess", "desc")
            .orderBy("popularDetail.totalSupporter", "desc")
            .limit(10)
            .get();

        const topTen: PopularCreator[] = [];
        topTenCreator.forEach((user) => {
            const targetUser = user.data() as UserModel;
            const tmp: PopularCreator = {
                firstName: targetUser.firstName,
                lastName: targetUser.lastName,
                profileImageUrl: targetUser.profileImageUrl,
                email: targetUser.email,
                totalProjectSuccess:
                    targetUser.popularDetail.totalProjectSuccess,
                totalSupporter: targetUser.popularDetail.totalSupporter,
            };
            topTen.push(tmp);
        });
        return NextResponse.json(
            { message: "retrieve 10 popular user successful", data: topTen },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
