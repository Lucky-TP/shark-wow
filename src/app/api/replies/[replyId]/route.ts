import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "src/libs/errors/apiError";
import { EditReplyPayload } from "src/interfaces/payload/replyPayload";
import { StatusCode } from "src/constants/statusCode";
import { withAuthVerify } from "src/utils/auth";
import { updateReply } from "src/libs/databases/replies";

export async function PUT(request: NextRequest, { params }: { params: { replyId: string } }) {
    try {
        const author = await withAuthVerify(request);
        const replyId = params.replyId;
        const body: EditReplyPayload = await request.json();

        await updateReply(replyId, {detail: body.detail})
        return NextResponse.json(
            { message: "Update Reply successful" },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
