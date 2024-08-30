import { getCollectionRef } from "../firestore";
import { getReplies } from "../replies";
import { CustomError } from "src/libs/errors/apiError";
import { CommentData } from "src/interfaces/models/common";
import { CommentModel } from "src/interfaces/models/comment";
import { StatusCode } from "src/constants/statusCode";
import { CollectionPath } from "src/constants/firestore";

export async function getComments(commentIds: string[]): Promise<CommentData[]> {
    try {
        const retrivedCommentsDatas: CommentData[] = [];
        const replyIds: string[] = [];
        if (commentIds.length > 0) {
            const retrivedCommentsModels: CommentModel[] = [];
            const commentCollection = getCollectionRef(CollectionPath.COMMENT);
            const querySnapshot = await commentCollection
                .where("commentId", "in", commentIds)
                .get();
            querySnapshot.docs.forEach((commentRef) => {
                const commentModel = commentRef.data() as CommentModel;
                console.log(commentModel);
                retrivedCommentsModels.push(commentModel);
                commentModel.replyIds.forEach((replyId) => {
                    replyIds.push(replyId);
                });
            });
            console.log(replyIds);
            const retrivedReplies = await getReplies(replyIds);
            console.log(retrivedReplies);
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
