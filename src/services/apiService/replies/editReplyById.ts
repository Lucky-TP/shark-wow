import axios, { AxiosResponse } from "axios";
import { apiPath } from "src/constants/routePath";
import { EditReplyPayload } from "src/interfaces/payload/replyPayload";
import { DefaultResponse } from "src/interfaces/response/commonResponse";

export async function editReplyById(
    replyId: string,
    payload: EditReplyPayload
) {
    try {
        const result: AxiosResponse<DefaultResponse> = await axios.put(
            apiPath.REPLIES.UPDATE(replyId),
            payload
        );
        result.data.status = result.status;
        return result.data;
    } catch (error: unknown) {
        throw new Error("Update reply failed");
    }
}
