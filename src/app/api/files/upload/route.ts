import { NextRequest, NextResponse } from "next/server";
import { withAuthVerify } from "src/utils/auth";
import { uploadFile } from "src/services/fileService";
import { errorHandler } from "src/libs/errors/apiError";
import { StatusCode } from "src/constants/statusCode";
import { StoragePath } from "src/constants/firestore";

export async function POST(request: NextRequest) {
    try {
        const tokenData = await withAuthVerify(request);
        const { uid } = tokenData;

        const formData = await request.formData();
        const body = Object.fromEntries(formData);

        const file = (body.file as Blob) || null;
        if (!file) {
            return NextResponse.json(
                {
                    message: "Upload file failed",
                },
                { status: StatusCode.BAD_REQUEST }
            );
        }
        const fileName = (body.file as File).name;
        const downloadUrl = await uploadFile(
            body.file as Blob,
            `${StoragePath.USER.PROFILE(uid)}`
        );

        return NextResponse.json(
            {
                message: "Upload file successful",
                url: downloadUrl,
            },
            { status: StatusCode.CREATED }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
