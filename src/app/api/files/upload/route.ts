import { NextRequest, NextResponse } from "next/server";
import { StatusCode } from "src/constants/statusCode";
import { withAuthAndVerify } from "src/utils/withAuth";
import { errorHandler } from "src/utils/errors/errorHandler";
import { uploadFile } from "src/services/fileService";

export async function POST(request: NextRequest) {
    try {
        const tokenData = await withAuthAndVerify(request);
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
            `images/${uid}/${fileName}`
        );

        return NextResponse.json(
            {
                message: "Upload file successful",
                url: downloadUrl,
            },
            { status: StatusCode.CREATED }
        );
    } catch (error: any) {
        return errorHandler(error);
    }
}
