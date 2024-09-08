import { getDocRef, runTransaction } from "../firestore";
import { MetadataModel } from "src/interfaces/models/metadata";
import { MetadataId } from "src/interfaces/models/enums";
import { CollectionPath } from "src/constants/firestore";
import { StatusCode } from "src/constants/statusCode";
import { CustomError } from "src/libs/errors/apiError";

export async function getNextId(metadataId: MetadataId): Promise<number> {
    let nextId: number = 1;

    try {
        await runTransaction(async (transaction) => {
            const metadataDoc = getDocRef(CollectionPath.METADATA, metadataId);
            const metadataSnapshot = await transaction.get(metadataDoc);

            if (!metadataSnapshot.exists) {
                const newMetadata: MetadataModel = {
                    id: metadataId,
                    lastId: 0,
                };
                transaction.set(metadataDoc, newMetadata);
                nextId = 1;
            } else {
                const metadata = metadataSnapshot.data() as MetadataModel;
                nextId = metadata.lastId + 1;
                transaction.update(metadataDoc, { lastId: nextId });
            }
        });
    } catch (error: unknown) {
        // console.error("Transaction failed: ", error);
        if (error instanceof CustomError) {
            throw error;
        }
        throw new CustomError("Failed to get next ID", StatusCode.INTERNAL_SERVER_ERROR);
    }

    return nextId;
}
