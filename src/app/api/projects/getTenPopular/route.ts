import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "src/libs/errors/apiError";
import { StatusCode } from "src/constants/statusCode";
import { CollectionPath } from "src/constants/firestore";
import { getCollectionRef } from "src/libs/databases/firestore";
import { ProjectModel } from "src/interfaces/models/project";
import { ProjectStatus, StageId } from "src/interfaces/models/enums";
import { ShowProject } from "src/interfaces/models/common";

export async function GET(request: NextRequest) {
    try {
        const allProjectData = getCollectionRef(CollectionPath.PROJECT);
        const topTenProject = await allProjectData
            .where("status", "==", ProjectStatus.RUNNING)
            .select(
                "projectId",
                "name",
                "carouselImageUrls",
                "description",
                "stages"
            )
            .orderBy("totalSupporter", "desc")
            .limit(10)
            .get();
        const topTen: ShowProject[] = [];

        topTenProject.forEach((project) => {
            const targetProject = project.data() as ProjectModel;
            const tmp: ShowProject = {
                projectId: targetProject.projectId,
                name: targetProject.name,
                carouselImageUrls: targetProject.carouselImageUrls,
                description: targetProject.description,
                category: targetProject.category,
                stages: [
                    {
                        minimumFunding:
                            targetProject.stages[StageId.CONCEPT]
                                .minimumFunding,
                        currentFunding:
                            targetProject.stages[StageId.CONCEPT]
                                .currentFunding,
                        goalFunding:
                            targetProject.stages[StageId.CONCEPT].goalFunding,
                    },
                    {
                        minimumFunding:
                            targetProject.stages[StageId.PROTOTYPE]
                                .minimumFunding,
                        currentFunding:
                            targetProject.stages[StageId.PROTOTYPE]
                                .currentFunding,
                        goalFunding:
                            targetProject.stages[StageId.PROTOTYPE].goalFunding,
                    },
                    {
                        minimumFunding:
                            targetProject.stages[StageId.PRODUCTION]
                                .minimumFunding,
                        currentFunding:
                            targetProject.stages[StageId.PRODUCTION]
                                .currentFunding,
                        goalFunding:
                            targetProject.stages[StageId.PRODUCTION]
                                .goalFunding,
                    },
                ],
            };
            topTen.push(tmp);
        });

        return NextResponse.json(
            { message: "retrieve 10 popular project successful", data: topTen },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: any) {
        return errorHandler(error);
    }
}
