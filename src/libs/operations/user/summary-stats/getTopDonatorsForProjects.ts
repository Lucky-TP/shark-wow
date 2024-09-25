"use server";

import { StatusCode } from "src/constants/statusCode";
import { DonatorPreview } from "src/interfaces/datas/user";
import { TransactionLog } from "src/interfaces/models/transaction";
import { getTransactionLogsByProjectIds } from "src/libs/databases/firestore/transactionLogs";
import { getUser } from "src/libs/databases/firestore/users";
import { CustomError } from "src/libs/errors/apiError";

export async function getTopDonatorsForProjects(
    transactionLogs: TransactionLog[],
    limit: number
): Promise<DonatorPreview[]>;

export async function getTopDonatorsForProjects(
    projectIds: string[],
    limit: number
): Promise<DonatorPreview[]>;

export async function getTopDonatorsForProjects(
    args: TransactionLog[] | string[],
    limit: number = 5
): Promise<DonatorPreview[]> {
    try {
        if (!Array.isArray(args) || args.length === 0) {
            return [];
        }

        const transactionLogs: TransactionLog[] = [];
        if (typeof args[0] === "string") {
            const projectIds = args as string[];
            transactionLogs.push(...(await getTransactionLogsByProjectIds(projectIds)));
        } else {
            transactionLogs.push(...(args as TransactionLog[]));
        }

        // Construct object group uid to total donate amount
        const transactionLogsOwners: { [key: string]: number } = {};
        transactionLogs.forEach(({ uid, amount }) => {
            if (!transactionLogsOwners[uid]) {
                transactionLogsOwners[uid] = 0;
            }
            transactionLogsOwners[uid] += amount;
        });

        // Sort object in descending order by value and get top most donate amount in range limit
        const topTransactionLogsOwners = Object.entries(transactionLogsOwners)
            .sort(([, amountA], [, amountB]) => amountB - amountA)
            .slice(0, limit);
        const topDonatorIds = topTransactionLogsOwners.map((pair) => pair[0]);

        // Get and extracted top donators who donated relate to previous calculation
        const topDonators = await Promise.all(
            topDonatorIds.map(async (donatorId) => {
                const retrievedUserModel = await getUser(donatorId);
                return {
                    uid: retrievedUserModel.uid,
                    username: retrievedUserModel.username,
                    profileImageUrl: retrievedUserModel.profileImageUrl ?? "",
                    totalDonates: transactionLogsOwners[donatorId],
                };
            })
        );
        return topDonators;
    } catch (error: unknown) {
        throw new CustomError("Get top donators failed", StatusCode.INTERNAL_SERVER_ERROR);
    }
}
