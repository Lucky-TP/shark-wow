import axios, { AxiosResponse } from "axios";
import { apiPath } from "src/constants/routePath";
import { GetPopularProjectsResponse } from "src/interfaces/response/projectResponse";

export async function getTenPopularProjects(): Promise<GetPopularProjectsResponse> {
    try {
        const result: AxiosResponse<GetPopularProjectsResponse> = await axios.get(
            apiPath.PROJECTS.GET_TEN_POPULAR
        );
        result.data.status = result.status;
        return result.data;
    } catch (error: unknown) {
        throw new Error("Get ten popular projects failed");
    }
}
