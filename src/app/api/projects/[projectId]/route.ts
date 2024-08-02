import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "src/utils/errors/errorHandler";
import { StatusCode } from "src/constants/statusCode";
import { ProjectModel } from "src/interfaces/models/project";
import { getDocAndSnapshot } from "src/databases/firestore/utils";
import { CollectionPath } from "src/constants/collection";

export async function GET(request : NextRequest, {params}: {params: {projectId: string}}){
    try {
        const { doc: projectDoc, snapshot: projectSnapshot } = await getDocAndSnapshot(CollectionPath.PROJECT,params.projectId);
        const projectData = projectSnapshot.data() as ProjectModel;

        if (!projectData){
            return NextResponse.json(
                { message: "Project not exist" },
                { status: StatusCode.BAD_REQUEST }
            );
        }

        return NextResponse.json(
            { message: "get project data successful", data:projectData},
            { status: StatusCode.SUCCESS },
        );
    }
    catch (error : any) {
        return errorHandler(error);
    }
}

export async function PUT(request : NextRequest, {params}: {params: {projectId: string}}){
    
}