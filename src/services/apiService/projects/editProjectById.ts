import axios, { AxiosResponse } from "axios";
import { apiPath } from "src/constants/routePath";
import { EditProjectPayload } from "src/interfaces/payload/projectPayload";
import { DefaultResponse } from "src/interfaces/response/commonResponse";

export async function editProjectById(
    projectId: string,
    payload: Partial<EditProjectPayload>
): Promise<DefaultResponse> {
    try {
        const response: AxiosResponse<DefaultResponse> = await axios.put(
            apiPath.PROJECTS.UPDATE(projectId),
            payload
        );
        return response.data;
    } catch (error: unknown) {
        throw new Error("Create project failed");
    }
}
