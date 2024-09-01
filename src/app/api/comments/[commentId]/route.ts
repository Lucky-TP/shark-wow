import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "src/libs/errors/apiError";
import { EditCommentPayload } from "src/interfaces/payload/commentPayload";
import { StatusCode } from "src/constants/statusCode";
import { withAuthVerify } from "src/utils/api/auth";
import { updateComment } from "src/libs/databases/comments";

export async function PUT(request: NextRequest, { params }: { params: { commentId: string } }) {
    try {
        await withAuthVerify(request);
        const commentId = params.commentId;
        const body: EditCommentPayload = await request.json();

        await updateComment(commentId, { detail: body.detail });
        return NextResponse.json(
            { message: "Update comment successful" },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
