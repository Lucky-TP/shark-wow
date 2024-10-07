import axios, { AxiosResponse } from "axios";
import { apiPath } from "src/constants/routePath";
import { GetSupporterSummaryProjects } from "src/interfaces/response/userResponse";

export async function getSupporterSummaryProjects(): Promise<GetSupporterSummaryProjects> {
    try {
        const result: AxiosResponse<GetSupporterSummaryProjects> = await axios.get(
            apiPath.USERS.GET_SUPPORTER_SUMMARY_PROJECTS
        );
        result.data.status = result.status;
        return result.data;
    } catch (error: unknown) {
        throw new Error("Get supporter summary projects failed");
    }
}
