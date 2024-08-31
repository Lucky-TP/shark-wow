import axios, { AxiosResponse } from "axios";
import { apiPath } from "src/constants/routePath";
import { CreateProjectResponse } from "src/interfaces/response/projectResponse";

export async function createProject(): Promise<CreateProjectResponse> {
    try {
        const result: AxiosResponse<CreateProjectResponse> = await axios.post(
            apiPath.PROJECTS.CREATE
        );
        result.data.status = result.status;
        return result.data;
    } catch (error: unknown) {
        throw new Error("Create project failed");
    }
}
