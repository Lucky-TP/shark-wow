"use server";

import { StatusCode } from "src/constants/statusCode";
import { UserActivity } from "src/interfaces/datas/user";
import { TransactionType } from "src/interfaces/models/enums";
import { TransactionLog } from "src/interfaces/models/transaction";
import { UserModel } from "src/interfaces/models/user";
import { getUsers } from "src/libs/databases/firestore/users";
import { CustomError } from "src/libs/errors/apiError";

export async function getRecentContributionsByTransactionLogs(
    transactionLogs: TransactionLog[]
): Promise<UserActivity[]> {
    try {
        const userIdsArray = Array.from(new Set(transactionLogs.map(({ uid }) => uid)));
        const userModelsArray = await getUsers(userIdsArray);

        const userModelsObject: { [key: string]: UserModel } = {};
        userModelsArray.forEach((userModel) => {
            userModelsObject[userModel.uid] = userModel;
        });
        const recentActivities = transactionLogs
            .sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime())
            .map(({ uid, amount, createAt, transactionType }) => {
                const userActivity: UserActivity = {
                    userPreview: {
                        uid,
                        username: userModelsObject[uid].username,
                        profileImageUrl: userModelsObject[uid].profileImageUrl ?? "",
                    },
                    amount,
                    date: createAt,
                    action: transactionType === TransactionType.FUNDING ? "funding" : "donate",
                };
                return userActivity;
            });
        return recentActivities;
    } catch (error: unknown) {
        throw new CustomError("Get recent contributions failed", StatusCode.INTERNAL_SERVER_ERROR);
    }
}
