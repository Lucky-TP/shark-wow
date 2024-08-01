import { NextRequest, NextResponse } from "next/server";
import { StatusCode } from "src/constants/statusCode";
import { CollectionPath } from "src/constants/collection";
import { getCollection } from "src/databases/firestore/utils";
import { UserModel } from "src/interfaces/models/user";
import { PopularCreator } from "src/interfaces/models/common";
import { errorHandler } from "src/utils/errors/errorHandler";

export async function GET(request : NextRequest) {
    try {
        const allUserData = getCollection(CollectionPath.USER);
        const topTenCreator = await allUserData.orderBy('popularDetail.totalProjectSuccess', 'desc').orderBy('popularDetail.totalSupporter', 'desc').limit(10).get();
        
        const topTen : PopularCreator[] = [];
        topTenCreator.forEach((user)=>{
            const targetUser = user.data() as UserModel;
            const tmp : PopularCreator = {firstName: targetUser.firstName,
                lastName: targetUser.lastName,
                profileImageUrl: targetUser.profileImageUrl,
                email: targetUser.email,
                totalProjectSuccess: targetUser.popularDetail.totalProjectSuccess,
                totalSupporter: targetUser.popularDetail.totalSupporter};
            topTen.push(tmp);
        });
        return NextResponse.json(
            { message: "retrieve 10 popular user successful",data:topTen},
            { status: StatusCode.SUCCESS },
        );
    }
    catch (error : any) {
        return errorHandler(error);
    }
}