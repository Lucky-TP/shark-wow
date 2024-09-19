import { getDocRef, runTransaction } from "../commons";
import { CollectionPath } from "src/constants/firestore";
import { StatusCode } from "src/constants/statusCode";
import { CustomError } from "src/libs/errors/apiError";
import { ReplyModel } from "src/interfaces/models/reply";
import { dateToString } from "src/utils/date";

export async function updateReply(
    replyId: string,
    newReplyData: Partial<ReplyModel>
): Promise<void> {
    try {
        await runTransaction(async (transaction) => {
            const replyDocRef = getDocRef(CollectionPath.REPLY, replyId);
            const replySnapshot = await transaction.get(replyDocRef);
            if (!replySnapshot.exists) {
                throw new CustomError("Reply does not exist", StatusCode.NOT_FOUND);
            }
            const currentreplyData = replySnapshot.data() as ReplyModel;
            const updateData: Partial<ReplyModel> = {
                detail: newReplyData.detail || currentreplyData.detail,
                updateAt: dateToString(new Date()),
            };
            transaction.update(replyDocRef, updateData);
        });
    } catch (error: unknown) {
        throw new CustomError("Update reply failed", StatusCode.INTERNAL_SERVER_ERROR);
    }
}
