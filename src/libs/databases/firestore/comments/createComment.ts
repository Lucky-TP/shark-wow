import { newDocRef, runTransaction } from "../commons";
import { CustomError } from "src/libs/errors/apiError";
import { CollectionPath } from "src/constants/firestore";
import { StatusCode } from "src/constants/statusCode";
import { CreateCommentPayload } from "src/interfaces/payload/commentPayload";
import { CommentModel } from "src/interfaces/models/comment";
import { dateToString } from "src/utils/date";

export async function createComment(
    authorId: string,
    commentPayload: CreateCommentPayload
): Promise<string> {
    try {
        const commentId = await runTransaction(async (transaction) => {
            const docRef = newDocRef(CollectionPath.COMMENT);
            const commentModel: CommentModel = {
                commentId: docRef.id,
                authorId,
                detail: commentPayload.detail,
                createAt: dateToString(new Date()),
                updateAt: dateToString(new Date()),
                replyIds: [],
            };
            transaction.set(docRef, commentModel);
            return docRef.id;
        });
        return commentId;
    } catch (error: unknown) {
        console.log(error);
        throw new CustomError("Create new comment failed", StatusCode.INTERNAL_SERVER_ERROR);
    }
}
