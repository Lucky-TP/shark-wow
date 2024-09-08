import { getDocRef, runTransaction } from "../firestore";
import { CollectionPath } from "src/constants/firestore";
import { StatusCode } from "src/constants/statusCode";
import { CustomError } from "src/libs/errors/apiError";
import { CommentModel } from "src/interfaces/models/comment";
import { dateToString } from "src/utils/date";

export async function updateComment(
    commentId: string,
    newCommentData: Partial<CommentModel>
): Promise<void> {
    try {
        await runTransaction(async (transaction) => {
            const commentDocRef = getDocRef(CollectionPath.COMMENT, commentId);
            const commentSnapshot = await transaction.get(commentDocRef);
            if (!commentSnapshot.exists) {
                throw new CustomError("User does not exist", StatusCode.NOT_FOUND);
            }
            const currentCommentData = commentSnapshot.data() as CommentModel;
            const updateData: Partial<CommentModel> = {
                detail: newCommentData.detail || currentCommentData.detail,
                replyIds: newCommentData.replyIds || currentCommentData.replyIds,
                updateAt: dateToString(new Date()),
            };
            transaction.update(commentDocRef, updateData);
        });
    } catch (error: unknown) {
        throw new CustomError("Update comment failed", StatusCode.INTERNAL_SERVER_ERROR);
    }
}
