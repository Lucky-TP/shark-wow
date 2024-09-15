import { CommentData } from "../datas/comment";
import { DefaultResponse } from "./commonResponse";

export interface GetCommentsWithRepliesResponse extends DefaultResponse {
    comments: CommentData[];
}
