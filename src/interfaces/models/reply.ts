import { Timestamp } from "firebase-admin/firestore";

export interface ReplyModel {
    replyId: string;
    authorId: string;
    detail: string;
    createAt: Timestamp;
    updateAt: Timestamp;
    parentCommentId: string;
}
