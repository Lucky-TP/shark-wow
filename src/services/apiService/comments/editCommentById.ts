import axios, { AxiosResponse } from "axios";
import { apiPath } from "src/constants/routePath";
import { EditCommentPayload } from "src/interfaces/payload/commentPayload";
import { DefaultResponse } from "src/interfaces/response/commonResponse";

export async function editCommentById(
    commentId: string,
    payload: EditCommentPayload
) {
    try {
        const result: AxiosResponse<DefaultResponse> = await axios.put(
            apiPath.COMMENTS.UPDATE(commentId),
            payload
        );
        result.data.status = result.status;
        return result.data;
    } catch (error: unknown) {
        throw new Error("Update comment failed");
    }
}
