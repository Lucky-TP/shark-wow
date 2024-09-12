import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "src/libs/errors/apiError";
import { CheckoutPayload } from "src/interfaces/payload/paymentPayload";
import { withAuthVerify } from "src/utils/api/auth";
import { StatusCode } from "src/constants/statusCode";
import { stripe } from "src/libs/stripe/stripe";
import { createOrder } from "src/libs/databases/orders/createOrder";
import { updateOrder } from "src/libs/databases/orders/updateOrder";
import { OrderStatus } from "src/interfaces/models/enums";

/**
 * @swagger
 * /api/payments/checkout:
 *   post:
 *     tags:
 *       - payments
 *     description: Create checkout
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Create checkout successful
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *
 */

export async function POST(request: NextRequest) {
    let orderId: string | undefined = undefined;
    try {
        const user = await withAuthVerify(request);
        const body: CheckoutPayload = await request.json();
        orderId = await createOrder({
            uid: user.uid,
            projectId: body.projectId,
            stageId: body.stageId,
            stageName: body.stageName,
            amount: body.fundingCost,
            transactionType: body.transactionType,
            currency: "thb",
        });
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "thb",
                        product_data: {
                            name: body.stageName,
                        },
                        unit_amount: body.fundingCost * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${request.headers.get("origin")}/payment/${orderId}/?success=true`,
            cancel_url: `${request.headers.get("origin")}/payment/${orderId}/?canceled=true`,
            metadata: {
                orderId: orderId,
            },
            payment_intent_data: {
                metadata: {
                    orderId: orderId,
                },
            },
        });
        return NextResponse.json(
            {
                message: "Create checkout successful",
                redirectUrl: session.url as string,
            },
            { status: StatusCode.CREATED }
        );
    } catch (error: unknown) {
        if (orderId) {
            await updateOrder(orderId, { status: OrderStatus.FAILED });
        }
        return errorHandler(error);
    }
}
