import axios, { AxiosResponse } from "axios";
import { apiPath } from "src/constants/routePath";
import { GetCreatorOwnProjects } from "src/interfaces/response/userResponse";

export async function getCreatorOwnProjects(): Promise<GetCreatorOwnProjects> {
    try {
        const result: AxiosResponse<GetCreatorOwnProjects> = await axios.get(
            apiPath.USERS.GET_CREATOR_OWN_PROJECTS
        );
        result.data.status = result.status;
        return result.data;
    } catch (error: unknown) {
        throw new Error("Get creator own projects failed");
    }
}
