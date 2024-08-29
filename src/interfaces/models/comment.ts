export interface CommentModel {
    commentId: string;
    authorId: string;
    detail: string;
    createAt: string;
    updateAt: string;
    replyIds: string[];
}
