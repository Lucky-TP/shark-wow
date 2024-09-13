import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { StatusCode } from "src/constants/statusCode";
import { stripe } from "src/libs/stripe/stripe";
import { updateOrder } from "src/libs/databases/orders/updateOrder";
import { OrderStatus } from "src/interfaces/models/enums";
import { getOrder } from "src/libs/databases/orders/getOrder";
import { createTransactionLog } from "src/libs/databases/transactionLogs/createTransactionLog";
import { getProject, updateProject } from "src/libs/databases/projects";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// export const config = {
//     api: {
//         bodyParser: false, // Disable body parsing for raw data required by Stripe
//     },
// };
export const maxDuration = 20;

export async function POST(request: NextRequest) {
    try {
        const rawBody = await request.text();
        const signature = request.headers.get("stripe-signature") as string;
        let event: Stripe.Event;
        try {
            event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
        } catch (err: any) {
            console.error(`❌ Error message: ${err.message}`);
            return NextResponse.json(
                { message: `Webhook Error: ${err.message}` },
                { status: StatusCode.BAD_REQUEST }
            );
        }
        // Handle the Stripe event based on its type
        console.log(event);
        console.log("✅ Success:", event.id);

        switch (event.type) {
            case "payment_intent.created": {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                const metadata = paymentIntent.metadata as { orderId: string };
                await updateOrder(metadata.orderId, {
                    status: OrderStatus.PROCESSING,
                    paymentIntentId: paymentIntent.id as string,
                });
                break;
            }
            case "payment_intent.succeeded": {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                const metadata = paymentIntent.metadata as { orderId: string };
                break;
            }
            case "payment_intent.payment_failed": {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                const metadata = paymentIntent.metadata as { orderId: string };
                await updateOrder(metadata.orderId, {
                    status: OrderStatus.FAILED,
                });
                break;
            }
            case "charge.succeeded": {
                const charge = event.data.object;
                const metadata = charge.metadata as { orderId: string };
                const order = await getOrder(metadata.orderId);
                const { orderId, projectId, amount, stageId } = order;
                const promiseFetchProject = getProject(projectId);
                const transactionId = await createTransactionLog({
                    uid: order.uid,
                    orderId: metadata.orderId,
                    projectId: order.projectId,
                    amount: order.amount,
                    stageId: order.stageId,
                    stageName: order.stageName,
                    transactionType: order.transactionType,
                    slipUrl: charge.receipt_url as string,
                });
                const promiseUpdateOrder = updateOrder(orderId, {
                    transactionId,
                    status: OrderStatus.COMPLETED,
                    paymentIntentId: charge.id as string,
                    paymentMethod: (charge.payment_method as string | null) ?? "",
                });
                const retrivedProjectModel = await promiseFetchProject;
                const updatedStages = retrivedProjectModel.stages;
                updatedStages[stageId].currentFunding += amount;
                updatedStages[stageId].totalSupporter += 1;
                const promiseUpdateProject = updateProject(projectId, {
                    totalSupporter: updatedStages[stageId].totalSupporter,
                    stages: updatedStages,
                });
                await Promise.all([promiseUpdateProject, promiseUpdateOrder]);
                break;
            }
            case "checkout.session.completed": {
                const checkout = event.data.object;
                const metadata = checkout.metadata as { orderId: string };
                break;
            }
            case "checkout.session.expired": {
                const checkout = event.data.object;
                const metadata = checkout.metadata as { orderId: string };
                await updateOrder(metadata.orderId, {
                    status: OrderStatus.EXPIRED,
                });
                break;
            }
            default: {
                console.warn(`Unhandled event type: ${event.type}`);
                break;
            }
        }

        // Acknowledge receipt of the event
        return NextResponse.json({ received: true });
    } catch (err: any) {
        console.error(`❌ Error in webhook handler: ${err.message}`);
        return NextResponse.json(
            { message: `Internal Server Error: ${err.message}` },
            { status: StatusCode.INTERNAL_SERVER_ERROR }
        );
    }
}
