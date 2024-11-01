import { NextRequest , NextResponse } from "next/server";
import { UserRole } from "src/interfaces/models/enums";
import { withAuthVerify } from "src/utils/api/auth";
import { StatusCode } from "src/constants/statusCode";
import { updateProject } from "src/libs/databases/firestore/projects";
import { ProjectStatus , StageStatus } from "src/interfaces/models/enums";
import { errorHandler } from "src/libs/errors/apiError";
import { getDocRef } from "src/libs/databases/firestore/commons";
import { CollectionPath } from "src/constants/firestore";
import { ProjectModel , Stage } from "src/interfaces/models/project";

export async function PATCH(request : NextRequest , { params }: { params: { projectId: string }}) {
    try{
        const tokenData = await withAuthVerify(request);
        const userRole = tokenData.role;
        if(userRole !== UserRole.ADMIN){
            return NextResponse.json(
                { message: "You have no permission." },
                { status: StatusCode.BAD_REQUEST }
            );
        }
        const projectId = params.projectId;

        const projectDocRef = getDocRef(CollectionPath.PROJECT, projectId);
        const projectSnapshot = await projectDocRef.get();
        const projectModel = projectSnapshot.data() as ProjectModel;
        const projectStages = projectModel.stages as Stage[];
        const projectStage1 = projectStages[0] as Stage;
        const projectStage2 = projectStages[1] as Stage;

        if(projectStage1.status === StageStatus.CURRENT && projectStage1.currentFunding < projectStage1.goalFunding){
            await updateProject(projectId, {
                status: ProjectStatus.DRAFT
            });
            return NextResponse.json(
                { message: "Reject project successful." },
                { status: StatusCode.SUCCESS }
            );
        }
        else if (projectStage1.status === StageStatus.CURRENT){
            projectStages[0].status = StageStatus.FAILED;
        }
        else if (projectStage2.status === StageStatus.CURRENT){
            projectStages[1].status = StageStatus.FAILED;
        }
        else{
            projectStages[2].status = StageStatus.FAILED;
        }
        await updateProject(projectId, {
            status: ProjectStatus.FAIL,
            stages:projectStages
        });
        return NextResponse.json(
            { message: "Reject project successful." },
            { status: StatusCode.SUCCESS }
        );
    }
    catch(error: any){
        return errorHandler(error);
    }
}