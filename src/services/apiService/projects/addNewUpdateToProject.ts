import axios, { AxiosResponse } from "axios";
import { apiPath } from "src/constants/routePath";
import { AddNewUpdateToProjectPayload } from "src/interfaces/payload/projectPayload";
import { DefaultResponse } from "src/interfaces/response/commonResponse";

export async function addNewUpdateToProject(
    projectId: string,
    payload: AddNewUpdateToProjectPayload
): Promise<DefaultResponse> {
    try {
        const result: AxiosResponse<DefaultResponse> = await axios.patch(
            apiPath.PROJECTS.ADD_NEW_UPDATE(projectId),
            payload
        );
        result.data.status = result.status;
        return result.data;
    } catch (error: unknown) {
        throw new Error("Add new update to project failed");
    }
}
