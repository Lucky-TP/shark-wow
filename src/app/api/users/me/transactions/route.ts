import { NextRequest, NextResponse } from "next/server";
import { StatusCode } from "src/constants/statusCode";
import { ContributedTransactionPreview } from "src/interfaces/datas/transaction";
import { getProjects } from "src/libs/databases/firestore/projects";
import { getTransactionLogsByUserId } from "src/libs/databases/firestore/transactionLogs/getTransactionLogsByUserId";
import { errorHandler } from "src/libs/errors/apiError";
import { withAuthVerify } from "src/utils/api/auth";

export const revalidate = 5;

/**
 * @swagger
 * /api/users/me/transactions:
 *   get:
 *     tags:
 *       - users
 *     summary: Retrieve the authenticated user's contributed transactions
 *     description:
 *       This endpoint fetches the contributed transactions for the authenticated user,
 *       including project names, amounts contributed, and transaction dates.
 *       Authentication is required via a valid token in the cookies.
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved contributed transactions
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error - An unexpected error occurred
 */
export async function GET(request: NextRequest) {
    try {
        const tokenData = await withAuthVerify(request);
        const { uid } = tokenData;
        const contributedTransactions = await getTransactionLogsByUserId(uid);
        const associatedProjects = await getProjects(
            contributedTransactions.map(({ projectId }) => projectId)
        );
        const mappingProjectIdToName: { [key: string]: string } = {};
        associatedProjects.forEach(({ projectId, name }) => {
            mappingProjectIdToName[projectId] = name;
        });

        const previewContributedTransactions = contributedTransactions
            .map(({ projectId, amount, createAt }) => {
                const previewContributedTransaction: ContributedTransactionPreview = {
                    projectId,
                    projectName: mappingProjectIdToName[projectId],
                    amount,
                    date: createAt,
                };
                return previewContributedTransaction;
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return NextResponse.json(
            {
                message: "Get contributed transaction successful",
                data: previewContributedTransactions,
            },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
