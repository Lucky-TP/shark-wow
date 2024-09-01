import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "src/libs/errors/apiError";
import { getCollectionRef } from "src/libs/databases/firestore";
import { CollectionPath } from "src/constants/firestore";
import { ProjectModel } from "src/interfaces/models/project";
import { ShowProject } from "src/interfaces/datas/project";
import { StageId } from "src/interfaces/models/enums";
import { StatusCode } from "src/constants/statusCode";

export async function GET(request: NextRequest) {
    try {
        const categories = request.nextUrl.searchParams.getAll("category");

        if (!categories || categories.length === 0) {
            return NextResponse.json(
                { message: "Categories parameter is missing or empty" },
                { status: StatusCode.BAD_REQUEST }
            );
        }

        const projectCollection = getCollectionRef(CollectionPath.PROJECT);
        const projectWithCategories = await projectCollection
            .where("category", "in", categories)
            .select(
                "projectId",
                "name",
                "carouselImageUrls",
                "description",
                "stages"
            )
            .get();
        const allProjectInCategories: ShowProject[] = [];

        projectWithCategories.forEach((project) => {
            const targetProject = project.data() as ProjectModel;
            const tmp: ShowProject = {
                projectId: targetProject.projectId,
                name: targetProject.name,
                carouselImageUrls: targetProject.carouselImageUrls,
                description: targetProject.description,
                category: targetProject.category,
                stages: [
                    {
                        fundingCost:
                            targetProject.stages[StageId.CONCEPT]
                                .fundingCost,
                        currentFunding:
                            targetProject.stages[StageId.CONCEPT]
                                .currentFunding,
                        goalFunding:
                            targetProject.stages[StageId.CONCEPT].goalFunding,
                    },
                    {
                        fundingCost:
                            targetProject.stages[StageId.PROTOTYPE]
                                .fundingCost,
                        currentFunding:
                            targetProject.stages[StageId.PROTOTYPE]
                                .currentFunding,
                        goalFunding:
                            targetProject.stages[StageId.PROTOTYPE].goalFunding,
                    },
                    {
                        fundingCost:
                            targetProject.stages[StageId.PRODUCTION]
                                .fundingCost,
                        currentFunding:
                            targetProject.stages[StageId.PRODUCTION]
                                .currentFunding,
                        goalFunding:
                            targetProject.stages[StageId.PRODUCTION]
                                .goalFunding,
                    },
                ],
            };
            allProjectInCategories.push(tmp);
        });

        return NextResponse.json(
            {
                message: "Retrieved all project by categories successful",
                data: allProjectInCategories,
            },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
