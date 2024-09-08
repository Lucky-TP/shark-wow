import axios, { AxiosResponse } from "axios";
import { apiPath } from "src/constants/routePath";
import { CreateCommentPayload } from "src/interfaces/payload/commentPayload";
import { DefaultResponse } from "src/interfaces/response/commonResponse";

export async function addCommentToProject(
    projectId: string,
    payload: CreateCommentPayload
) {
    try {
        const result: AxiosResponse<DefaultResponse> = await axios.post(
            apiPath.COMMENTS.PROJECT.CREATE(projectId),
            payload
        );
        result.data.status = result.status;
        return result.data;
    } catch (error: unknown) {
        throw new Error("Add comment to project failed");
    }
}
