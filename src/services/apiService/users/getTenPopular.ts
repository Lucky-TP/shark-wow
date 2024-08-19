import axios, { AxiosResponse } from "axios";
import { apiPath } from "src/constants/routePath";
import { GetTopTenCreatorResponse } from "src/interfaces/response/userResponse";

export async function getTenPopularUsers(): Promise<GetTopTenCreatorResponse> {
    try {
        const result: AxiosResponse<GetTopTenCreatorResponse> = await axios.get(
            apiPath.USERS.GET_TEN_POPULAR
        );
        return result.data;
    } catch (error: unknown) {
        throw new Error("Get ten popular users failed");
    }
}
