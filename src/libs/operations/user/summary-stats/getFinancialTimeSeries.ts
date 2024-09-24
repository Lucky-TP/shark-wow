"use server";

import { TimeSeriesDataPoint } from "src/interfaces/datas/common";
import { TransactionLog } from "src/interfaces/models/transaction";

export async function getFinancialTimeSeries(
    transactionLogs: TransactionLog[]
): Promise<TimeSeriesDataPoint[]> {
    const financialTimeSeries: TimeSeriesDataPoint[] = [];
    if (transactionLogs.length > 0) {
        let startDate = Infinity;
        transactionLogs.forEach((transactionLog) => {
            const date = new Date(transactionLog.createAt);
            date.setHours(0, 0, 0, 0);
            startDate = Math.min(startDate, date.getTime());
        });

        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);

        const start = new Date(startDate);
        const end = new Date(endDate);
        const daysBetween = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

        const dateObjects: { [key: string]: TimeSeriesDataPoint } = {};

        for (let i = 0; i <= daysBetween; i++) {
            const currentDate = new Date(start);
            currentDate.setDate(start.getDate() + i);

            // Format the date as YYYY-MM-DD
            const formattedDate = currentDate.toISOString().split("T")[0];

            const startOfDay = new Date(
                `${currentDate.toISOString().split("T")[0]}T00:00:00Z`
            ).toISOString();

            dateObjects[formattedDate] = {
                totalAmount: 0,
                transactionCount: 0,
                date: startOfDay,
            };
        }

        transactionLogs.forEach((transactionLog) => {
            const { createAt: contributedDate, amount } = transactionLog;
            const contributedFormattedDate = new Date(contributedDate).toISOString().split("T")[0];

            dateObjects[contributedFormattedDate].totalAmount += amount;
            dateObjects[contributedFormattedDate].transactionCount += 1;
        });
        financialTimeSeries.push(...Object.values(dateObjects));
    }
    return financialTimeSeries;
}
