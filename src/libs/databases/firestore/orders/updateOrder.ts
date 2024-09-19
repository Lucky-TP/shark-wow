import { getDocRef, runTransaction } from "../firestore";
import { CollectionPath } from "src/constants/firestore";
import { StatusCode } from "src/constants/statusCode";
import { OrderModel } from "src/interfaces/models/order";
import { OrderStatus } from "src/interfaces/models/enums";
import { CustomError } from "src/libs/errors/apiError";
import { dateToString } from "src/utils/date";

interface NewOrderData {
    transactionId: string;
    paymentIntentId: string;
    paymentMethod: string;
    status: OrderStatus;
}

export async function updateOrder(orderId: string, newOrderData: Partial<NewOrderData>) {
    try {
        await runTransaction(async (transaction) => {
            const docRef = getDocRef(CollectionPath.ORDER, orderId);
            const retrivedOrderSnapshot = await transaction.get(docRef);
            if (!retrivedOrderSnapshot.exists) {
                throw new CustomError("Order does not exists", StatusCode.NOT_FOUND);
            }
            const retrivedOrderModel = retrivedOrderSnapshot.data() as OrderModel;
            if (retrivedOrderModel.status === OrderStatus.COMPLETED) {
                return;
            }
            const orderModel: Partial<OrderModel> = {
                transactionId: newOrderData.transactionId || retrivedOrderModel.transactionId || "",
                paymentIntentId:
                    newOrderData.paymentIntentId || retrivedOrderModel.paymentIntentId || "",
                paymentMethod: newOrderData.paymentMethod || retrivedOrderModel.paymentMethod || "",
                status: newOrderData.status || retrivedOrderModel.status,
                updateAt: dateToString(new Date()),
            };
            transaction.update(docRef, orderModel);
        });
    } catch (error: unknown) {
        console.log(error);
        throw new CustomError("Update order failed", StatusCode.INTERNAL_SERVER_ERROR);
    }
}
