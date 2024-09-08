import { NextRequest, NextResponse } from "next/server";
import { getOrder } from "src/libs/databases/orders/getOrder";
import { errorHandler } from "src/libs/errors/apiError";
import { withAuthVerify } from "src/utils/api/auth";
import { StatusCode } from "src/constants/statusCode";

export async function GET(request: NextRequest, { params }: { params: { orderId: string } }) {
    try {
        await withAuthVerify(request);
        const orderId = params.orderId;
        const orderModel = await getOrder(orderId);
        return NextResponse.json(
            { message: "Get order successful", data: orderModel },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
