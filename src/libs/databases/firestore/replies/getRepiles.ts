import { CollectionPath } from "src/constants/firestore";
import { ReplyModel } from "src/interfaces/models/reply";
import { getCollectionRef } from "../commons";
import { CustomError } from "src/libs/errors/apiError";
import { StatusCode } from "src/constants/statusCode";
import { chunkArray } from "src/utils/api/queries";

export async function getReplies(replyIds: string[]): Promise<ReplyModel[]> {
    try {
        const retrivedReplies: ReplyModel[] = [];
        if (replyIds.length > 0) {
            const replyCollection = getCollectionRef(CollectionPath.REPLY);
            const replyIdsChunks = chunkArray(replyIds, 30);

            for (const replyIdsChunk of replyIdsChunks) {
                const querySnapshot = await replyCollection
                    .where("replyId", "in", replyIdsChunk)
                    .orderBy("createAt", "desc")
                    .get();
                querySnapshot.docs.forEach((replyRef) => {
                    const replyModel = replyRef.data() as ReplyModel;
                    retrivedReplies.push(replyModel);
                });
            }
        }
        return retrivedReplies;
    } catch (error: unknown) {
        throw new CustomError("Retrive replies failed", StatusCode.INTERNAL_SERVER_ERROR);
    }
}
