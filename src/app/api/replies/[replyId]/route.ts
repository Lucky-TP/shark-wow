import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "src/libs/errors/apiError";
import { EditReplyPayload } from "src/interfaces/payload/replyPayload";
import { StatusCode } from "src/constants/statusCode";
import { withAuthVerify } from "src/utils/api/auth";
import { updateReply } from "src/libs/databases/firestore/replies";
import { CollectionPath } from "src/constants/firestore";
import { getDocRef } from "src/libs/databases/firestore";
import { ReplyModel } from "src/interfaces/models/reply";
import { CommentModel } from "src/interfaces/models/comment";
import { updateComment } from "src/libs/databases/firestore/comments";

/**
 * @swagger
 * /api/replies/{replyId}:
 *   put:
 *     tags:
 *       - replies
 *     description: Update a reply by its ID. This endpoint allows updating specific fields of a reply, such as its content.
 *     parameters:
 *       - in: path
 *         name: replyId
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique identifier for the reply to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               detail:
 *                 type: string
 *                 description: The updated content of the reply.
 *             required:
 *               - detail
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Update reply successful
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *
 *   delete:
 *     tags:
 *       - replies
 *     description: Delete replies by ID
 *     parameters:
 *       - in: path
 *         name: replyId
 *         schema:
 *           type: string
 *         required: true
 *         description: Reply ID
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Delete reply successful
 *       401:
 *         description: Unauthorized - Missing or invalid token
 */

export async function PUT(request: NextRequest, { params }: { params: { replyId: string } }) {
    try {
        const author = await withAuthVerify(request);
        const replyId = params.replyId;
        const body: EditReplyPayload = await request.json();

        await updateReply(replyId, { detail: body.detail });
        return NextResponse.json(
            { message: "Update Reply successful" },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { replyId: string } }) {
    try {
        const userToken = await withAuthVerify(request);
        const replyId = params.replyId;
        const replyRef = getDocRef(CollectionPath.REPLY, replyId);
        const replyData = (await replyRef.get()).data() as ReplyModel;
        const parentReply = replyData.parentCommentId;

        if (userToken.uid !== replyData.authorId) {
            return NextResponse.json(
                { message: "You have no permission." },
                { status: StatusCode.BAD_REQUEST }
            );
        }

        const commentDoc = getDocRef(CollectionPath.COMMENT, parentReply);
        const commentData = (await commentDoc.get()).data() as CommentModel;
        const allReply = commentData.replyIds;
        await updateComment(parentReply, {
            replyIds: allReply.filter((reply) => reply != replyId),
        });

        await replyRef.delete();

        return NextResponse.json(
            { message: "Delete comment successful." },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
