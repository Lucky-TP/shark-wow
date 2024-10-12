import { getCollectionRef } from "../commons";
import { getReplies } from "../replies";
import { CustomError } from "src/libs/errors/apiError";
import { CommentData } from "src/interfaces/datas/comment";
import { CommentModel } from "src/interfaces/models/comment";
import { StatusCode } from "src/constants/statusCode";
import { CollectionPath } from "src/constants/firestore";
import { chunkArray } from "src/utils/api/queries";

export async function getComments(commentIds: string[]): Promise<CommentData[]> {
    try {
        const retrivedCommentsDatas: CommentData[] = [];
        const replyIds: string[] = [];
        if (commentIds.length > 0) {
            const retrivedCommentsModels: CommentModel[] = [];
            const commentCollection = getCollectionRef(CollectionPath.COMMENT);

            const commentIdsChunks = chunkArray(commentIds, 30);
            for (const commentIdsChunk of commentIdsChunks) {
                const querySnapshot = await commentCollection
                    .where("commentId", "in", commentIdsChunk)
                    .orderBy("createAt", "desc")
                    .orderBy("updateAt", "desc")
                    .get();
                querySnapshot.docs.forEach((commentRef) => {
                    const commentModel = commentRef.data() as CommentModel;
                    retrivedCommentsModels.push(commentModel);
                    commentModel.replyIds.forEach((replyId) => {
                        replyIds.push(replyId);
                    });
                });
            }

            const retrivedReplies = await getReplies(replyIds);

            retrivedCommentsModels.forEach((commentModel) => {
                const filteredReplies = retrivedReplies.filter(({ replyId }) => {
                    return commentModel.replyIds.includes(replyId);
                });
                const commentData: CommentData = {
                    commentId: commentModel.commentId,
                    authorId: commentModel.authorId,
                    detail: commentModel.detail,
                    createAt: commentModel.createAt,
                    updateAt: commentModel.updateAt,
                    replys: filteredReplies,
                };
                retrivedCommentsDatas.push(commentData);
            });
        }
        return retrivedCommentsDatas;
    } catch (error: unknown) {
        if (error instanceof CustomError) {
            throw error;
        }
        throw new CustomError("Retrive comments failed", StatusCode.INTERNAL_SERVER_ERROR);
    }
}
