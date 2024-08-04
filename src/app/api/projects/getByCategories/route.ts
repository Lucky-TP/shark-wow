import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "src/libs/errors/apiError";
import { getCollectionRef } from "src/libs/databases/firestore";
import { CollectionPath } from "src/constants/firestore";
import { ProjectModel } from "src/interfaces/models/project";
import { ShowProject } from "src/interfaces/models/common";
import { StageId } from "src/interfaces/models/enums";
import { StatusCode } from "src/constants/statusCode";

export async function GET(request: NextRequest) {
    try {
        const categories = request.nextUrl.searchParams.getAll("categories");

        if (!categories || categories.length === 0) {
            return NextResponse.json(
                { message: "Categories parameter is missing or empty" },
                { status: StatusCode.BAD_REQUEST }
            );
        }

        const allProjectData = getCollectionRef(CollectionPath.PROJECT);
        const projectWithCategories = await allProjectData
            .where("categories", "in", categories)
            .select("projectId", "name", "images", "description", "stages")
            .get();
        const allProjectInCategories: ShowProject[] = [];

        projectWithCategories.forEach((project) => {
            const targetProject = project.data() as ProjectModel;
            const tmp: ShowProject = {
                projectId: targetProject.projectId,
                name: targetProject.name,
                images: targetProject.images,
                description: targetProject.description,
                stages: [
                    {
                        currentFunding:
                            targetProject.stages[StageId.CONCEPT]
                                .currentFunding,
                        goalFunding:
                            targetProject.stages[StageId.CONCEPT].goalFunding,
                    },
                    {
                        currentFunding:
                            targetProject.stages[StageId.PROTOTYPE]
                                .currentFunding,
                        goalFunding:
                            targetProject.stages[StageId.PROTOTYPE].goalFunding,
                    },
                    {
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
                message:
                    "retrieved all project by target categories successful",
                data: allProjectInCategories,
            },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
