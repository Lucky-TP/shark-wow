import { NextRequest , NextResponse } from "next/server";
import { errorHandler } from "src/utils/errors/errorHandler";
import { StatusCode } from "src/constants/statusCode";
import { CollectionPath } from "src/constants/collection";
import { getCollection } from "src/databases/firestore/utils";
import { ProjectModel } from "src/interfaces/models/project";
import { ProjectStatus, StageId } from "src/interfaces/models/enums";
import { PopularProject } from "src/interfaces/models/common";

export async function GET(request : NextRequest) {
    try {
        const allProjectData = getCollection(CollectionPath.PROJECT);
        const topTenProject = await allProjectData.where("status","==",ProjectStatus.RUNNING).select("projectId","name","images","description","stages").orderBy('totalSupporter','desc').limit(10).get();
        const topTen : PopularProject[] = [];

        topTenProject.forEach(project => {
            const targetProject = project.data() as ProjectModel;
            const tmp : PopularProject = {
                projectId: targetProject.projectId,
                name: targetProject.name,
                images: targetProject.images,
                description: targetProject.description,
                stages: [{
                    currentFunding: targetProject.stages[StageId.CONCEPT].currentFunding,
                    goalFunding: targetProject.stages[StageId.CONCEPT].goalFunding
                },
                {
                    currentFunding: targetProject.stages[StageId.PROTOTYPE].currentFunding,
                    goalFunding: targetProject.stages[StageId.PROTOTYPE].goalFunding
                },
                {
                    currentFunding: targetProject.stages[StageId.PRODUCTION].currentFunding,
                    goalFunding: targetProject.stages[StageId.PRODUCTION].goalFunding
                }],
            };
            topTen.push(tmp);
        });

        return NextResponse.json(
            { message: "retrieve 10 popular project successful",data:topTen},
            { status: StatusCode.SUCCESS },
        );
    }
    catch (error : any){
        return errorHandler(error);
    }
}