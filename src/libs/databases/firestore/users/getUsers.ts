import { getCollectionRef } from "../commons";
import { TransactionLog } from "src/interfaces/models/transaction";
import { DEFAULT_IN_QUERY_VALUE } from "src/constants/firestore/query/value";
import { StatusCode } from "src/constants/statusCode";
import { CollectionPath } from "src/constants/firestore";
import { chunkArray } from "src/utils/api/queries";
import { CustomError } from "src/libs/errors/apiError";
import { UserModel } from "src/interfaces/models/user";

export async function getUsers(userIds: string[]): Promise<UserModel[]>;

export async function getUsers<T>(
    userIds: string[],
    callback: (userModel: UserModel) => T
): Promise<T[]>;

export async function getUsers<T>(
    userIds: string[],
    callback?: (userModel: UserModel) => T
): Promise<T[]> {
    try {
        const retrievedUserModels: T[] = [];
        if (userIds.length > 0) {
            const userModelCollection = getCollectionRef(CollectionPath.USER);
            const chunks = chunkArray<string>(userIds, DEFAULT_IN_QUERY_VALUE);
            for (const chunk of chunks) {
                const querySnapshot = await userModelCollection.where("uid", "in", chunk).get();
                const retrievedUserModelChunk = querySnapshot.docs.map((userModelSnapshot) => {
                    const userModel = userModelSnapshot.data() as UserModel;
                    if (callback) {
                        return callback(userModel);
                    }
                    return userModel as T;
                });
                retrievedUserModels.push(...retrievedUserModelChunk);
            }
        }
        return retrievedUserModels;
    } catch (error: unknown) {
        console.log(error);
        if (error instanceof CustomError) {
            throw error;
        }
        throw new CustomError("Retrive users failed", StatusCode.INTERNAL_SERVER_ERROR);
    }
}
