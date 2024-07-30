import { NextRequest, NextResponse } from "next/server";
import { CollectionPath } from "src/constants/collection";
import { StatusCode } from "src/constants/statusCode";
import { getUser } from "src/databases/firestore/userDoc";
import { getDoc } from "src/databases/firestore/utils";
import { EditUserPayload } from "src/interfaces/payload/userPayload";
import { errorHandler } from "src/utils/errors/errorHandler";
import { withAuthVerify } from "src/utils/withAuth";
import { UserModel } from "src/interfaces/models/user";

export async function GET(request: NextRequest) { //get user info
    try {
        const tokenData = await withAuthVerify(request);
        const retrivedUser = await getUser(tokenData.uid);
        return NextResponse.json(
            { message: "Retrived user successful", data: retrivedUser },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: any) {
        return errorHandler(error);
    }
}

export async function PUT(request: NextRequest) { //edit user info
    try{
        const tokenData = await withAuthVerify(request);
        const body : EditUserPayload = await request.json();
        
        const userDoc = getDoc(CollectionPath.USER,tokenData.uid);
        const currentUserData = (await userDoc.get()).data() as UserModel;

        await userDoc.update({firstName: body.firstName || currentUserData.firstName,
            lastName: body.lastName || currentUserData.lastName,
            aboutMe: body.aboutMe || currentUserData.aboutMe,
            address: body.address || currentUserData.address,
            contact: body.contact || currentUserData.contact});
        
        return NextResponse.json(
            { message: "Update user successful"},
            { status: StatusCode.SUCCESS }
        );
    }
    catch (error : any) {
        return errorHandler(error);
    }
}
