import { getDocRef, runTransaction } from "../firestore";
import { CollectionPath } from "src/constants/firestore";
import { StatusCode } from "src/constants/statusCode";
import { CustomError } from "src/libs/errors/apiError";
import { OrderModel } from "src/interfaces/models/order";

export async function getOrder(orderId: string) {
    try {
        const retrivedOrder = await runTransaction(async (transaction) => {
            const orderDocRef = getDocRef(CollectionPath.ORDER, orderId);
            const orderSnapshot = await transaction.get(orderDocRef);

            if (!orderSnapshot.exists) {
                throw new CustomError("Order not exists", StatusCode.NOT_FOUND);
            }

            return orderSnapshot.data() as OrderModel;
        });
        return retrivedOrder;
    } catch (error: unknown) {
        if (error instanceof CustomError) {
            throw error;
        }
        throw new CustomError("Get order failed", StatusCode.INTERNAL_SERVER_ERROR);
    }
}
