import axios, { AxiosResponse } from "axios";
import { apiPath } from "src/constants/routePath";
import { GetProjectsByCategoriesResponse } from "src/interfaces/response/projectResponse";

export async function searchProject(
    search: string
): Promise<GetProjectsByCategoriesResponse> {
    try {
        const queryUrl = `${apiPath.PROJECTS.GET_BY_SEARCH}?search=${search}`;
        const result: AxiosResponse<GetProjectsByCategoriesResponse> = await axios.get(queryUrl);
        result.data.status = result.status;
        return result.data;
    } catch (error: unknown) {
        throw new Error("Get projects by search failed");
    }
}
