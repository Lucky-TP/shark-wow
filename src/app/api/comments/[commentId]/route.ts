import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "src/libs/errors/apiError";
import { EditCommentPayload, DeleteCommentPayload } from "src/interfaces/payload/commentPayload";
import { StatusCode } from "src/constants/statusCode";
import { withAuthVerify } from "src/utils/api/auth";
import { updateComment } from "src/libs/databases/firestore/comments";
import { CollectionPath } from "src/constants/firestore";
import { getDocRef } from "src/libs/databases/firestore/commons";
import { updateUser } from "src/libs/databases/firestore/users";
import { updateProject } from "src/libs/databases/firestore/projects";
import { UserModel } from "src/interfaces/models/user";
import { ProjectModel } from "src/interfaces/models/project";
import { CommentModel } from "src/interfaces/models/comment";

/**
 * @swagger
 * /api/comments/{commentId}:
 *   put:
 *     tags:
 *       - comments
 *     description: Update a comment based on its ID.
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique identifier of the comment to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               detail:
 *                 type: string
 *                 description: The new content of the comment.
 *             required:
 *               - detail
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Comment successfully updated.
 *       401:
 *         description: Unauthorized - Missing or invalid token.
 *
 *   delete:
 *     tags:
 *       - comments
 *     description: Delete a comment based on its ID.
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique identifier of the comment to be deleted.
 *     requestBody:
 *       description: Payload containing the type and ID required for the deletion.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: Type of the entity associated with the comment. Can be 'user' or 'project'.
 *               id:
 *                 type: string
 *                 description: ID of the user or project associated with the comment.
 *             required:
 *               - type
 *               - id
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Comment successfully deleted.
 *       400:
 *         description: Bad request - No permission to delete this comment.
 *       401:
 *         description: Unauthorized - Missing or invalid token.
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
