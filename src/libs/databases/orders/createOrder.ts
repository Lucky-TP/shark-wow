import { newDocRef, runTransaction } from "../firestore";
import { CollectionPath } from "src/constants/firestore";
import { StatusCode } from "src/constants/statusCode";
import { OrderModel } from "src/interfaces/models/order";
import { OrderStatus, TransactionType } from "src/interfaces/models/enums";
import { CustomError } from "src/libs/errors/apiError";
import { dateToString } from "src/utils/date";

interface InitialOrderData {
    uid: string;
    projectId: string;
    currency: string;
    stageId: number;
    stageName: string;
    amount: number;
    transactionType: TransactionType;
}

export async function createOrder(orderData: InitialOrderData) {
    try {
        const orderId = await runTransaction(async (transaction) => {
            const docRef = newDocRef(CollectionPath.ORDER);
            const orderModel: OrderModel = {
                orderId: docRef.id,
                uid: orderData.uid,
                projectId: orderData.projectId,
                currency: orderData.currency,
                stageId: orderData.stageId,
                stageName: orderData.stageName,
                amount: orderData.amount,
                transactionType: orderData.transactionType,
                status: OrderStatus.PENDING,
                createAt: dateToString(new Date()),
                updateAt: dateToString(new Date()),
            };
            transaction.set(docRef, orderModel);
            return docRef.id;
        });
        return orderId;
    } catch (error: unknown) {
        console.log(error);
        throw new CustomError("Create order failed", StatusCode.INTERNAL_SERVER_ERROR);
    }
}
