import { newDocRef, runTransaction } from "../firestore";
import { CustomError } from "src/libs/errors/apiError";
import { CollectionPath } from "src/constants/firestore";
import { StatusCode } from "src/constants/statusCode";
import { ReplyModel } from "src/interfaces/models/reply";
import { CreateReplyPayload } from "src/interfaces/payload/replyPayload";
import { dateToString } from "src/utils/date";

export async function createReply(
    authorId: string,
    parentCommentId: string,
    replyPayload: CreateReplyPayload
): Promise<string> {
    try {
        const replyId = await runTransaction(async (transaction) => {
            const docRef = newDocRef(CollectionPath.REPLY);
            const replyModel: ReplyModel = {
                replyId: docRef.id,
                authorId,
                detail: replyPayload.detail,
                createAt: dateToString(new Date()),
                updateAt: dateToString(new Date()),
                parentCommentId,
            };
            transaction.set(docRef, replyModel);
            return docRef.id;
        });
        return replyId;
    } catch (error: unknown) {
        throw new CustomError(
            "Create new comment failed",
            StatusCode.INTERNAL_SERVER_ERROR
        );
    }
}
