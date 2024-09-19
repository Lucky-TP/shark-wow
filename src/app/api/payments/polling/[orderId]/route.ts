import { NextRequest, NextResponse } from "next/server";
import { StatusCode } from "src/constants/statusCode";
import { OrderStatus } from "src/interfaces/models/enums";
import { getOrder } from "src/libs/databases/firestore/orders/getOrder";
import { getTransactionLog } from "src/libs/databases/firestore/transactionLogs/getTransactionLog";
import { errorHandler } from "src/libs/errors/apiError";
import { withAuthVerify } from "src/utils/api/auth";

/**
 * @swagger
 * /api/payments/polling/{orderId}:
 *   get:
 *     tags:
 *       - payments
 *     description: Get order information by order ID
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Payment succeed
 *       400:
 *         description: Unauthorized - Payment not received
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *
 */

export async function GET(request: NextRequest, { params }: { params: { orderId: string } }) {
    try {
        await withAuthVerify(request);
        const orderId = params.orderId;
        const orderModel = await getOrder(orderId);
        const transactionId = orderModel.transactionId;
        if (orderModel.status !== OrderStatus.COMPLETED || !transactionId) {
            return NextResponse.json(
                { message: "Payment not received" },
                { status: StatusCode.BAD_REQUEST }
            );
        }
        const transactionLog = await getTransactionLog(transactionId);
        return NextResponse.json(
            { message: "Payment succeed", slipUrl: transactionLog.slipUrl },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
