import { NextRequest, NextResponse } from "next/server";
import { withAuthVerify } from "src/utils/api/auth";
import { uploadFile } from "src/services/fileService";
import { errorHandler } from "src/libs/errors/apiError";
import { StatusCode } from "src/constants/statusCode";
import { FileUploadPayload } from "src/interfaces/payload/filePayload";
import {
    FileTypeKeys,
    FileUploadPayloadKeys,
} from "src/constants/payloadKeys/file";
import { getStoragePath } from "src/utils/getStoragePath";

export async function POST(request: NextRequest) {
    try {
        const tokenData = await withAuthVerify(request);
        const uid = tokenData.uid;

        const formData = await request.formData();
        const body: Omit<FileUploadPayload, "file"> & { file: Blob } = {
            file: formData.get(FileUploadPayloadKeys.file) as Blob,
            fileType: formData.get(
                FileUploadPayloadKeys.fileType
            ) as FileTypeKeys,
            projectId: formData.get(FileUploadPayloadKeys.projectId) as string,
        };

        const { file, fileType, projectId } = body;
        const path = getStoragePath(fileType, uid, projectId);
        if (!file || !fileType || !path) {
            return NextResponse.json(
                {
                    message: "Upload file failed",
                },
                { status: StatusCode.BAD_REQUEST }
            );
        }

        const downloadUrl = await uploadFile(file, path);
        return NextResponse.json(
            {
                message: "Upload file successful",
                url: downloadUrl,
            },
            { status: StatusCode.CREATED }
        );
    } catch (error: unknown) {
        console.log(error);
        return errorHandler(error);
    }
}
