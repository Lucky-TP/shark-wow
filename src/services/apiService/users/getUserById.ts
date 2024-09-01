import axios, { AxiosResponse } from "axios";
import { apiPath } from "src/constants/routePath";
import { GetUserByIdResponse } from "src/interfaces/response/userResponse";

export async function getUserById(userId: string) {
    try {
        const result: AxiosResponse<GetUserByIdResponse> = await axios.get(
            apiPath.USERS.GET_BY_ID(userId)
        );
        result.data.status = result.status;
        return result.data;
    } catch (error: unknown) {
        throw new Error("Get user by id failed");
    }
}
