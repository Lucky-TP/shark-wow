import axios, { AxiosResponse } from "axios";
import { apiPath } from "src/constants/routePath";
import { GetCreatorSummaryStats } from "src/interfaces/response/userResponse";

export async function getCreatorSummaryStats(): Promise<GetCreatorSummaryStats> {
    try {
        const result: AxiosResponse<GetCreatorSummaryStats> = await axios.get(
            apiPath.USERS.GET_CREATOR_SUMMARY_STATS
        );
        result.data.status = result.status;
        return result.data;
    } catch (error: unknown) {
        throw new Error("Get creator summary stats failed");
    }
}
