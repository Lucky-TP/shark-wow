import axios, { AxiosResponse } from "axios";
import { apiPath } from "src/constants/routePath";
import { GetPendingProjectsResponse } from "src/interfaces/response/projectResponse";

export async function getTenPopularProjects(): Promise<GetPendingProjectsResponse> {
    try {
        const result: AxiosResponse<GetPendingProjectsResponse> = await axios.get(
            apiPath.ADMIN.GET_PENDING_PROJECT
        );
        result.data.status = result.status;
        return result.data;
    } catch (error: unknown) {
        throw new Error("Get pending projects failed");
    }
}
