import axios, { AxiosResponse } from "axios";
import { apiPath } from "src/constants/routePath";
import { DefaultResponse } from "src/interfaces/response/commonResponse";

export async function approve(
    projectId: string,
): Promise<DefaultResponse> {
    try {
        const result: AxiosResponse<DefaultResponse> = await axios.patch(
            apiPath.ADMIN.APPROVE(projectId),
        );
        result.data.status = result.status;
        return result.data;
    } catch (error: unknown) {
        throw new Error("Approve project failed");
    }
}