import axios, { AxiosResponse } from "axios";
import { apiPath } from "src/constants/routePath";
import { GetContributedTransactions } from "src/interfaces/response/userResponse";

export async function getContributedTransactions(): Promise<GetContributedTransactions> {
    try {
        const result: AxiosResponse<GetContributedTransactions> = await axios.get(
            apiPath.USERS.GET_CONTRIBUTED_TRANSACTIONS
        );
        result.data.status = result.status;
        return result.data;
    } catch (error: unknown) {
        throw new Error("Get creator summary stats failed");
    }
}
