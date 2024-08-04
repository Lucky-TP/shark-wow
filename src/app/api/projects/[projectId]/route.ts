import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "src/libs/errors/apiError";
import { StatusCode } from "src/constants/statusCode";
import { ProjectModel } from "src/interfaces/models/project";
import { getDocRef } from "src/libs/databases/firestore";
import { CollectionPath } from "src/constants/firestore";

export async function GET(
    request: NextRequest,
    { params }: { params: { projectId: string } }
) {
    try {
        const projectDocRef = getDocRef(
            CollectionPath.PROJECT,
            params.projectId
        );
        const projectSnapshot = await projectDocRef.get();
        if (!projectSnapshot.exists) {
            return NextResponse.json(
                { message: "Project not exist" },
                { status: StatusCode.NOT_FOUND }
            );
        }
        const projectData = projectSnapshot.data() as ProjectModel;
        return NextResponse.json(
            { message: "Get project data successful", data: projectData },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { projectId: string } }
) {}
