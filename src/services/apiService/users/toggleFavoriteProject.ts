import axios from "axios";
import { apiPath } from "src/constants/routePath";
import { DefaultResponse } from "src/interfaces/response/commonResponse";

export async function toggleFavoriteProject(projectId: string): Promise<DefaultResponse> {
    try {
        const result = await axios.put(`${apiPath.USERS.FAVORITE_PROJECTS}/${projectId}`);
        result.data.status = result.status;
        return result.data;
    } catch (error: unknown) {
        throw new Error("Toggling favorite project failed");
    }
}
