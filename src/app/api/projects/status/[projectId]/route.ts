import { NextRequest, NextResponse } from "next/server";
import { withAuthVerify } from "src/utils/api/auth";
import { getDocRef } from "src/libs/databases/firestore/commons";
import { CollectionPath } from "src/constants/firestore";
import { StatusCode } from "src/constants/statusCode";
import { ProjectModel } from "src/interfaces/models/project";
import { ProjectStatus } from "src/interfaces/models/enums";
import { errorHandler } from "src/libs/errors/apiError";
import { updateProject } from "src/libs/databases/firestore/projects";
import { projectValidation } from "src/libs/validation";

export async function PATCH(request: NextRequest, { params }: { params: { projectId: string } }) {
    try {
        const tokenData = await withAuthVerify(request);
        const uid = tokenData.uid;

        if(!(await projectValidation(params.projectId))){
            return NextResponse.json(
                { message: "Please fill project information before launch." },
                { status: StatusCode.BAD_REQUEST }
            );
        }

        const projectDocRef = getDocRef(CollectionPath.PROJECT, params.projectId);
        const projectSnapshot = await projectDocRef.get();
        if (!projectSnapshot.exists) {
            return NextResponse.json(
                { message: "Project not exist" },
                { status: StatusCode.NOT_FOUND }
            );
        }

        const currentProjectModel = projectSnapshot.data() as ProjectModel;
        const projectId = currentProjectModel.projectId;
        if (uid !== currentProjectModel.uid) {
            return NextResponse.json(
                { message: "You have no permission to update this project" },
                { status: StatusCode.UNAUTHORIZED }
            );
        }

        if (currentProjectModel.status === ProjectStatus.DRAFT) {
            await updateProject(projectId, {
                status: ProjectStatus.RUNNING
            });
        } else {
            return NextResponse.json(
                {
                    message: "Project is running , etc.",
                },
                { status: StatusCode.BAD_REQUEST }
            );
        }

        return NextResponse.json(
            { message: "Launch project successful" },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}