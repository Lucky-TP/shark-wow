import { BlogType } from "./enums";

export interface ReceivedComment {
    commentId: number;
    uid: string;
    message: string;
}

export interface Blog {
    id: number;
    content: string;
    type: BlogType;
}
