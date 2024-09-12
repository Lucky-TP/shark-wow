import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "src/libs/errors/apiError";
import { EditCommentPayload, DeleteCommentPayload } from "src/interfaces/payload/commentPayload";
import { StatusCode } from "src/constants/statusCode";
import { withAuthVerify } from "src/utils/api/auth";
import { updateComment } from "src/libs/databases/comments";
import { CollectionPath } from "src/constants/firestore";
import { getDocRef } from "src/libs/databases/firestore";
import { updateUser } from "src/libs/databases/users";
import { updateProject } from "src/libs/databases/projects";
import { UserModel } from "src/interfaces/models/user";
import { ProjectModel } from "src/interfaces/models/project";
import { CommentModel } from "src/interfaces/models/comment";

/**
 * @swagger
 * /api/comments/[commentId]:
 *   put:
 *     tags:
 *       - comments
 *     description: Edit comment by comment ID
 *     parameters:
 *       - name: commentId
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Update comment successful
 *       401:
 *         description: Unauthorized - Missing or invalid token
 * 
 *   delete:
 *     tags:
 *       - comments
 *     description: Delete comment by comment ID
 *     parameters:
 *       - name: commentId
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Delete comment successful.
 *       400:
 *         description: You have no permission.
 *       401:
 *         description: Unauthorized - Missing or invalid token 
 */

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

export async function DELETE(request: NextRequest, { params }: { params: { commentId: string } }) {
    try {
        const userToken = await withAuthVerify(request);
        const commentId = params.commentId;
        const body: DeleteCommentPayload = await request.json();
        const data = getDocRef(CollectionPath.COMMENT, commentId);
        const commentData = (await data.get()).data() as CommentModel;

        if (userToken.uid !== commentData.authorId) {
            return NextResponse.json(
                { message: "You have no permission." },
                { status: StatusCode.BAD_REQUEST }
            );
        }

        if (body.type === "user") {
            const userDoc = getDocRef(CollectionPath.USER, body.id);
            const userDocs = (await userDoc.get()).data() as UserModel;
            const receivedComment = userDocs.receivedCommentIds;
            await updateUser(body.id, {
                receivedCommentIds: receivedComment.filter((comment) => comment != commentId),
            });
        } else if (body.type === "project") {
            const projDoc = getDocRef(CollectionPath.PROJECT, body.id);
            const projDocs = (await projDoc.get()).data() as ProjectModel;
            const receivedComment = projDocs.discussionIds;
            await updateProject(body.id, {
                discussionIds: receivedComment.filter((comment) => comment != commentId),
            });
        }

        const allReply = commentData.replyIds;
        allReply.forEach(async (reply) => {
            const replyRef = getDocRef(CollectionPath.REPLY, reply);
            await replyRef.delete();
        });

        await data.delete();

        return NextResponse.json(
            { message: "Delete comment successful." },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
