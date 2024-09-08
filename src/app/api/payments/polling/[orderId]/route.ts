import { NextRequest, NextResponse } from "next/server";
import { StatusCode } from "src/constants/statusCode";
import { OrderStatus } from "src/interfaces/models/enums";
import { getOrder } from "src/libs/databases/orders/getOrder";
import { getTransactionLog } from "src/libs/databases/transactionLogs/getTransactionLog";
import { errorHandler } from "src/libs/errors/apiError";
import { withAuthVerify } from "src/utils/api/auth";

export async function GET(request: NextRequest, { params }: { params: { orderId: string } }) {
    try {
        await withAuthVerify(request);
        const orderModel = await getOrder(params.orderId);
        if (!orderModel.transactionId) {
            return NextResponse.json(
                { message: "Payment not received" },
                { status: StatusCode.BAD_REQUEST }
            );
        }
        const transactionLog = await getTransactionLog(orderModel.transactionId);
        if (orderModel.status !== OrderStatus.COMPLETED) {
            return NextResponse.json(
                { message: "Payment not received" },
                { status: StatusCode.BAD_REQUEST }
            );
        }
        return NextResponse.json(
            { message: "Payment succeed", slipUrl: transactionLog.slipUrl },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
