import { StatusCode } from "src/constants/statusCode";
import { ProjectPreview } from "src/interfaces/datas/project";
import { getProjects } from "src/libs/databases/firestore/projects";
import { CustomError } from "src/libs/errors/apiError";

export async function getTopSupportedProjects(
    projectIds: string[],
    limit: number = 5
): Promise<ProjectPreview[]> {
    try {
        const projectModels = await getProjects(projectIds);
        const topFiveFullProjectSupported = projectModels
            .sort((a, b) => b.totalSupporter - a.totalSupporter)
            .slice(0, limit);
        const topFiveProjectSupported: ProjectPreview[] = topFiveFullProjectSupported.map(
            ({ projectId, name, carouselImageUrls, totalSupporter }) => {
                return {
                    projectId,
                    name,
                    previewImageUrl: carouselImageUrls[0] ?? "",
                    totalSupports: totalSupporter,
                };
            }
        );
        return topFiveProjectSupported;
    } catch (error: unknown) {
        throw new CustomError(
            "Get top supported projects failed",
            StatusCode.INTERNAL_SERVER_ERROR
        );
    }
}
