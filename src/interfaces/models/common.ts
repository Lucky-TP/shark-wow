import { BlogType } from "./enums";

export interface ReceivedComment {
    commentId: number;
    uid: number;
    detail: string;
    date: Date;
}
