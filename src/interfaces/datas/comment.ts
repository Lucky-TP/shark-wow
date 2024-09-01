import { CommentModel } from "../models/comment";
import { ReplyModel } from "../models/reply";

export type CommentData = Omit<CommentModel, "replyIds"> & {
    replys: ReplyModel[];
};
