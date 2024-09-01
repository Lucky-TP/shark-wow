import { Timestamp } from "firebase-admin/firestore";

export interface CommentModel {
    commentId: string;
    authorId: string;
    detail: string;
    createAt: Timestamp;
    updateAt: Timestamp;
    replyIds: string[];
}
