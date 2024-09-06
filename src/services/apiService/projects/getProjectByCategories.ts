import axios, { AxiosResponse } from "axios";
import { apiPath } from "src/constants/routePath";
import { GetProjectsByCategoriesResponse } from "src/interfaces/response/projectResponse";

export async function getProjectByCategories(
    categories: string[]
): Promise<GetProjectsByCategoriesResponse> {
    try {
        const queryParams = `${categories.map((category) => `category=${category}`).join("&")}`;
        const queryUrl = `${apiPath.PROJECTS.GET_BY_CATEGORIES}?${queryParams}`;
        const result: AxiosResponse<GetProjectsByCategoriesResponse> = await axios.get(queryUrl);
        result.data.status = result.status;
        return result.data;
    } catch (error: unknown) {
        throw new Error("Get projects by categories failed");
    }
}
