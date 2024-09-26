import { NextRequest , NextResponse } from "next/server";
import { UserRole } from "src/interfaces/models/enums";
import { withAuthVerify } from "src/utils/api/auth";
import { StatusCode } from "src/constants/statusCode";
import { updateProject } from "src/libs/databases/firestore/projects";
import { ProjectStatus } from "src/interfaces/models/enums";
import { errorHandler } from "src/libs/errors/apiError";

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

        await updateProject(projectId, {
            status: ProjectStatus.RUNNING
        });
        return NextResponse.json(
            { message: "Laucnh project successful." },
            { status: StatusCode.SUCCESS }
        );
    }
    catch(error: any){
        return errorHandler(error);
    }
}