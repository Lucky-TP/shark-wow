import { getDoc } from "./utils";
import { CollectionPath } from "src/constants/collection";
import { Metadata } from "src/interfaces/models/metadata";
import { MetadataId } from "src/interfaces/models/enums";

const METADATA_COLLECTION = CollectionPath.METADATA;

export async function getNextId(metadataId: MetadataId) {
    const metadataDoc = getDoc(METADATA_COLLECTION, metadataId);
    const metadataSnapshot = await metadataDoc.get();
    if (!metadataSnapshot.exists) {
        const newMetadata: Metadata = {
            id: metadataId,
            lastId: 0,
        };
        await metadataDoc.set(newMetadata);
        return 1;
    }
    const metadata: Metadata = metadataSnapshot.data() as Metadata;
    const nextId = metadata.lastId + 1;
    await metadataDoc.update({ lastId: nextId });
    return nextId;
}
