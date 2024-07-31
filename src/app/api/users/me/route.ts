import { NextRequest, NextResponse } from "next/server";
import { CollectionPath } from "src/constants/collection";
import { StatusCode } from "src/constants/statusCode";
import { getUser } from "src/databases/firestore/userDoc";
import { getDocAndSnapshot } from "src/databases/firestore/utils";
import { errorHandler } from "src/utils/errors/errorHandler";
import { withAuthVerify } from "src/utils/withAuth";
import { UserModel } from "src/interfaces/models/user";
import { EditUserPayload } from "src/interfaces/payload/userPayload";
import { uploadFile } from "src/services/fileService";
import { StoragePath } from "src/constants/storage";

export async function GET(request: NextRequest) {
    //get user info
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

export async function PUT(request: NextRequest) {
    //edit user info
    try {
        const tokenData = await withAuthVerify(request);
        const { uid } = tokenData;

        const formData = await request.formData();
        const body: EditUserPayload = Object.fromEntries(formData);

        const { profileImageFile, cvFile } = body;

        let profileImageUrl = "";
        if (profileImageFile) {
            profileImageUrl = await uploadFile(
                profileImageFile,
                StoragePath.USER.PROFILE(uid)
            );
        }
        let cvUrl = "";
        if (cvFile) {
            cvUrl = await uploadFile(cvFile, StoragePath.USER.CV(uid));
        }

        const { doc: userDoc, snapshot: userSnapshot } =
            await getDocAndSnapshot(CollectionPath.USER, tokenData.uid);
        if (!userSnapshot.exists) {
            return NextResponse.json(
                { message: "User not exists" },
                { status: StatusCode.NOT_FOUND }
            );
        }

        const currentUserData = userSnapshot.data() as UserModel;
        await userDoc.update({
            firstName: body.firstName || currentUserData.firstName,
            lastName: body.lastName || currentUserData.lastName,
            aboutMe: body.aboutMe || currentUserData.aboutMe,
            //profileImageUrl: body.profileImageUrl || currentUserData.profileImageUrl,
            address: body.address || currentUserData.address,
            contact: body.contact || currentUserData.contact,
            profileImageUrl,
            cvUrl,
        });

        return NextResponse.json(
            { message: "Update user successful" },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: any) {
        return errorHandler(error);
    }
}
