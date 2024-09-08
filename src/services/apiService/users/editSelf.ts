import axios from "axios";
import { apiPath } from "src/constants/routePath";
import { EditUserPayload } from "src/interfaces/payload/userPayload";
import { DefaultResponse } from "src/interfaces/response/commonResponse";

export async function editSelf(payload: Partial<EditUserPayload>): Promise<DefaultResponse> {
    try {
        const result = await axios.put(apiPath.USERS.EDIT_SELF, payload);
        result.data.status = result.status;
        return result.data;
    } catch (error: unknown) {
        throw new Error("Edit user-self failed");
    }
}
