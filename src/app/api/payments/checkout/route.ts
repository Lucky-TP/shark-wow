import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "src/libs/errors/apiError";
import { CheckoutPayload } from "src/interfaces/payload/paymentPayload";
import { withAuthVerify } from "src/utils/api/auth";
import { StatusCode } from "src/constants/statusCode";
import { stripe } from "src/libs/stripe/stripe";
import { createOrder } from "src/libs/databases/firestore/orders/createOrder";
import { updateOrder } from "src/libs/databases/firestore/orders/updateOrder";
import { OrderStatus } from "src/interfaces/models/enums";

/**
 * @swagger
 * /api/payments/checkout:
 *   post:
 *     tags:
 *       - payments
 *     description: Create a checkout session for payment processing
 *     security:
 *       - CookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectId:
 *                 type: string
 *                 description: The ID of the project being funded
 *               stageId:
 *                 type: string
 *                 description: The ID of the stage within the project
 *               stageName:
 *                 type: string
 *                 description: The name of the stage
 *               fundingCost:
 *                 type: number
 *                 format: float
 *                 description: The cost of funding the stage
 *               paymentMethod:
 *                 type: string
 *                 description: The payment method to be used (e.g., 'card', 'paypal')
 *               transactionType:
 *                 type: string
 *                 description: The type of transaction (e.g., 'donation', 'investment')
 *             required:
 *               - projectId
 *               - stageId
 *               - stageName
 *               - fundingCost
 *               - paymentMethod
 *               - transactionType
 *     responses:
 *       200:
 *         description: Create checkout successful
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       400:
 *         description: Bad request - Invalid request data
 *       500:
 *         description: Internal server error - Something went wrong
 */

export async function POST(request: NextRequest) {
    let orderId: string | undefined = undefined;
    try {
        const user = await withAuthVerify(request);
        const body: CheckoutPayload = await request.json();
        orderId = await createOrder({
            uid: user.uid,
            email: user.email,
            projectId: body.projectId,
            projectName: body.projectName,
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
