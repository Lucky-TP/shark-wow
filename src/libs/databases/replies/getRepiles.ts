import { CollectionPath } from "src/constants/firestore";
import { ReplyModel } from "src/interfaces/models/reply";
import { getCollectionRef } from "../firestore";
import { CustomError } from "src/libs/errors/apiError";
import { StatusCode } from "src/constants/statusCode";

export async function getReplies(replyIds: string[]): Promise<ReplyModel[]> {
    try {
        const retrivedReplies: ReplyModel[] = [];
        if (replyIds.length > 0) {
            const commentCollection = getCollectionRef(CollectionPath.COMMENT);
            const querySnapshot = await commentCollection.where("commentId", "in", replyIds).get();
            querySnapshot.docs.forEach((replyRef) => {
                const replyModel = replyRef.data() as ReplyModel;
                retrivedReplies.push(replyModel);
            });
        }
        return retrivedReplies;
    } catch (error: unknown) {
        throw new CustomError("Retrive replies failed", StatusCode.INTERNAL_SERVER_ERROR);
    }
}
