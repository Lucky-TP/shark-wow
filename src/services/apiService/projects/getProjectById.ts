import axios, { AxiosResponse } from "axios";
import { apiPath } from "src/constants/routePath";
import { GetProjectResponse } from "src/interfaces/response/projectResponse";

export async function getProjectById(
    projectId: string
): Promise<GetProjectResponse> {
    try {
        const result: AxiosResponse<GetProjectResponse> = await axios.get(
            `${apiPath.PROJECTS.GET_BY_ID(projectId)}`
        );
        result.data.status = result.status;
        return result.data;
    } catch (error: unknown) {
        throw new Error("Get project by ID failed");
    }
}
