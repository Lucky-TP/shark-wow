import { NextRequest, NextResponse } from "next/server";
import { StatusCode } from "src/constants/statusCode";
import { getProjects } from "src/libs/databases/firestore/projects/getProjects";
import { getUser } from "src/libs/databases/firestore/users";
import { errorHandler } from "src/libs/errors/apiError";
import { withAuthVerify } from "src/utils/api/auth";
import { countOverallProjectStats } from "src/utils/projects/server/countOverallProjectStats";
import { CreatorSummaryStats } from "src/interfaces/datas/user";
import { getTransactionLogsByProjectIds } from "src/libs/databases/firestore/transactionLogs";
import {
    getFinancialTimeSeries,
    getRecentContributionsByTransactionLogs,
    getTopDonatorsForProjects,
    getTopSupportedProjects,
} from "src/libs/operations/user/summary-stats/";
import { TransactionType } from "src/interfaces/models/enums";

export const revalidate = 20;

/**
 * @swagger
 * /api/users/me/creator-view/summary-stats:
 *   get:
 *     tags:
 *       - users
 *     summary: Retrieve summary statistics for the authenticated user's projects
 *     description:
 *       Returns summary statistics for the authenticated user's projects,
 *       including top projects, top donators, overall project stats,
 *       financial time series, recent contributions, total funding,
 *       and total supporters. Authentication is required via a valid token.
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched creator view's summary statistics
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error - An unexpected error occurred
 */
export async function GET(request: NextRequest) {
    try {
        const tokenData = await withAuthVerify(request);
        const userModel = await getUser(tokenData.uid);

        const projectIds = userModel.ownProjectIds;
        const projectModels = await getProjects(projectIds);
        const projectStats = countOverallProjectStats(projectModels);

        const transactionLogs = await getTransactionLogsByProjectIds(projectIds);
        const financialTimeSeries = getFinancialTimeSeries(transactionLogs);
        const [topSupportedProjects, topDonators, recentContributions] = await Promise.all([
            getTopSupportedProjects(projectIds, 5),
            getTopDonatorsForProjects(transactionLogs, 5),
            getRecentContributionsByTransactionLogs(transactionLogs),
        ]);
        const totalFunding = transactionLogs
            .filter(({ transactionType }) => transactionType === TransactionType.FUNDING)
            .reduce((acc, { amount }) => acc + amount, 0);
        const totalSupporter = projectModels.reduce(
            (acc, { totalSupporter }) => acc + totalSupporter,
            0
        );

        const summaryStatsCreatorView: CreatorSummaryStats = {
            topDonators,
            topSupportedProjects,
            projectStats,
            financialTimeSeries,
            recentContributions,
            totalFunding,
            totalSupporter,
        };
        return NextResponse.json(
            {
                message: "Fetch creator view's summary statistics successful!",
                data: summaryStatsCreatorView,
            },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
