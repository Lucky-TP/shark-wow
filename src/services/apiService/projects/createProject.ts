import axios, { AxiosResponse } from "axios";
import { apiPath } from "src/constants/routePath";
import { DefaultResponse } from "src/interfaces/response/commonResponse";

export async function createProject(): Promise<DefaultResponse> {
    try {
        const result: AxiosResponse<DefaultResponse> = await axios.post(
            apiPath.PROJECTS.CREATE
        );
        result.data.status = result.status;
        return result.data;
    } catch (error: unknown) {
        throw new Error("Create project failed");
    }
}
