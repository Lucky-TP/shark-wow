import { NextRequest, NextResponse } from "next/server";
import { CollectionPath } from "src/constants/firestore";
import { StatusCode } from "src/constants/statusCode";
import { getUser } from "src/libs/databases/users";
import { getDocRef } from "src/libs/databases/firestore";
import { errorHandler } from "src/libs/errors/apiError";
import { withAuthVerify } from "src/utils/auth";
import { EditUserPayload } from "src/interfaces/payload/userPayload";
import { timestampToDate } from "src/utils/date";
import { UserModel } from "src/interfaces/models/user";
import { UserDataWithDate } from "src/interfaces/models/common";

export async function GET(request: NextRequest) {
    //get user info
    try {
        const tokenData = await withAuthVerify(request);
        const retrivedUser = await getUser(tokenData.uid);

        const { birthDate, ...user } = retrivedUser;
        const modifyUser: UserDataWithDate = {
            ...user,
            birthDate: timestampToDate(birthDate),
        };

        return NextResponse.json(
            { message: "Retrived user successful", data: modifyUser },
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

        // const formData = await request.formData();
        // const body: Partial<EditUserPayload> = Object.fromEntries(formData);

        // let promiseUploadImage: Promise<string> | undefined;
        // if (profileImageFile) {
        //     promiseUploadImage = uploadFile(
        //         profileImageFile,
        //         StoragePath.USER.PROFILE(uid)
        //     );
        // }
        // let promiseUploadCv: Promise<string> | undefined;
        // if (cvFile) {
        //     promiseUploadCv = uploadFile(cvFile, StoragePath.USER.CV(uid));
        // }

        const userDocRef = getDocRef(CollectionPath.USER, uid);
        const userSnapshot = await userDocRef.get();
        if (!userSnapshot.exists) {
            return NextResponse.json(
                { message: "User not exists" },
                { status: StatusCode.NOT_FOUND }
            );
        }

        // if (body.address) {
        //     body.address = JSON.parse(body.address as unknown as string);
        // }
        // if (body.contact) {
        //     body.contact = JSON.parse(body.contact as unknown as string);
        // }

        // let profileImageUrl = "";
        // if (promiseUploadImage) {
        //     profileImageUrl = await promiseUploadImage;
        // }
        // let cvUrl = "";
        // if (promiseUploadCv) {
        //     cvUrl = await promiseUploadCv;
        // }

        const body: Partial<EditUserPayload> = await request.json();
        const currentUserData = userSnapshot.data() as UserModel;
        await userDocRef.update({
            firstName: body.firstName || currentUserData.firstName,
            lastName: body.lastName || currentUserData.lastName,
            aboutMe: body.aboutMe || currentUserData.aboutMe,
            address: body.address || currentUserData.address,
            contact: body.contact || currentUserData.contact,
            profileImageUrl:
                body.profileImageUrl || currentUserData.profileImageUrl,
            cvUrl: body.cvUrl || currentUserData.cvUrl,
        });

        return NextResponse.json(
            { message: "Update user successful" },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
