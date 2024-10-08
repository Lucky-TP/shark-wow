import { NextRequest, NextResponse } from "next/server";
import { withAuthVerify } from "src/utils/api/auth";
import { uploadFile } from "src/services/fileService";
import { errorHandler } from "src/libs/errors/apiError";
import { StatusCode } from "src/constants/statusCode";
import { FileUploadPayload } from "src/interfaces/payload/filePayload";
import {
    FileUploadPayloadKeys,
    ProjectFileType,
    UserFileType,
} from "src/constants/payloadKeys/file";
import { getStoragePath } from "src/utils/files/server/getStoragePath";

/**
 * @swagger
 * /api/files/upload:
 *   post:
 *     tags:
 *       - files
 *     description: Upload files
 *     security:
 *       - CookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload
 *               fileType:
 *                 type: string
 *                 description: The type of the file
 *               projectId:
 *                 type: string
 *                 description: The ID of the project associated with the file
 *             required:
 *               - file
 *               - fileType
 *     responses:
 *       200:
 *         description: Upload file successful
 *       400:
 *         description: Bad request - Upload file failed
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal server error - Something went wrong
 */

export async function POST(request: NextRequest) {
    try {
        const tokenData = await withAuthVerify(request);
        const uid = tokenData.uid;

        const formData = await request.formData();
        const body: Omit<FileUploadPayload, "file"> & { file: File } = {
            file: formData.get(FileUploadPayloadKeys.file) as File,
            type: formData.get(FileUploadPayloadKeys.type) as UserFileType | ProjectFileType,
            projectId: formData.get(FileUploadPayloadKeys.projectId) as string,
        };

        const { file, type, projectId } = body;

        if (!file || !type) {
            return NextResponse.json(
                { message: "File and type are required." },
                { status: StatusCode.BAD_REQUEST }
            );
        }
        const path = projectId ? getStoragePath(type, uid, projectId) : getStoragePath(type, uid);
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
