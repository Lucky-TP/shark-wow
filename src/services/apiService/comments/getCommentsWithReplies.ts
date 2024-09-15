import axios, { AxiosResponse } from "axios";
import { apiPath } from "src/constants/routePath";
import { GetCommentsWithRepliesResponse } from "src/interfaces/response/commentResponse";

export async function getCommentsWithReplies(
    targetId: string,
    targetType: "user" | "project"
): Promise<GetCommentsWithRepliesResponse> {
    try {
        const endpoint =
            targetType === "user"
                ? apiPath.COMMENTS.USER.GET(targetId)
                : apiPath.COMMENTS.PROJECT.GET(targetId);

        const result: AxiosResponse<GetCommentsWithRepliesResponse> = await axios.get(endpoint);
        result.data.status = result.status;
        return result.data;
    } catch (error: unknown) {
        console.log("Failed to get comments with replies:", error);
        throw new Error("Get comments with replies failed");
    }
}
