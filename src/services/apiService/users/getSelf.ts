import axios, { AxiosResponse } from "axios";
import { apiPath } from "src/constants/routePath";
import { GetUserResponse } from "src/interfaces/response/userResponse";

export async function getSelf(): Promise<GetUserResponse> {
    try {
        const result: AxiosResponse<GetUserResponse> = await axios.get(
            apiPath.USERS.GET_SELF
        );
        result.data.status = result.status;
        return result.data;
    } catch (error: unknown) {
        throw new Error("Get user-self failed");
    }
}
