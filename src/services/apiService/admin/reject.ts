import axios, { AxiosResponse } from "axios";
import { apiPath } from "src/constants/routePath";
import { DefaultResponse } from "src/interfaces/response/commonResponse";

export async function reject(
    projectId: string,
): Promise<DefaultResponse> {
    try {
        const result: AxiosResponse<DefaultResponse> = await axios.patch(
            apiPath.ADMIN.REJECT(projectId),
        );
        result.data.status = result.status;
        return result.data;
    } catch (error: unknown) {
        throw new Error("Reject project failed");
    }
}
