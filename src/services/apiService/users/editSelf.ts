import axios from "axios";
import { apiPath } from "src/constants/routePath";
import { EditUserPayloadKeys } from "src/constants/payloadKeys/user";
import { EditUserPayload } from "src/interfaces/payload/userPayload";
import { DefaultResponse } from "src/interfaces/response/commonResponse";

export async function editSelf(
    payload: Partial<EditUserPayload>
): Promise<DefaultResponse> {
    try {
        const response = await axios.put(apiPath.USERS.EDIT_SELF, payload);
        return response.data;
    } catch (error: unknown) {
        throw new Error("Edit user-self failed");
    }
}
