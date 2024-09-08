import axios, { AxiosResponse } from "axios";
import { apiPath } from "src/constants/routePath";
import { CreateReplyPayload } from "src/interfaces/payload/replyPayload";
import { DefaultResponse } from "src/interfaces/response/commonResponse";

export async function addReplyToComment(
    parentCommentId: string,
    payload: CreateReplyPayload
) {
    try {
        const result: AxiosResponse<DefaultResponse> = await axios.post(
            apiPath.REPLIES.CREATE(parentCommentId),
            payload
        );
        result.data.status = result.status;
        return result.data;
    } catch (error: unknown) {
        throw new Error("Add reply to comment failed");
    }
}
