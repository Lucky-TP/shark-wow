import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "src/utils/errors/errorHandler";
import { StatusCode } from "src/constants/statusCode";
import { ProjectModel } from "src/interfaces/models/project";
import { getDocAndSnapshot} from "src/databases/firestore/utils";
import { CollectionPath } from "src/constants/collection";
import { ProjectStatus } from "src/interfaces/models/enums";
import { withAuthVerify } from "src/utils/withAuth";
import { EditDraftProjectPayload , EditRunningProjectPayload } from "src/interfaces/payload/projectPayload";

export async function GET(request : NextRequest, {params}: {params: {projectId: string}}){
    try {
        const { doc: projectDoc, snapshot: projectSnapshot } = await getDocAndSnapshot(CollectionPath.PROJECT,params.projectId);
        const projectData = projectSnapshot.data() as ProjectModel;

        if (!projectData){
            return NextResponse.json(
                { message: "Project not exist" },
                { status: StatusCode.NOT_FOUND }
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
    try {
        const { doc: projectDoc, snapshot: projectSnapshot } = await getDocAndSnapshot(CollectionPath.PROJECT,params.projectId);
        const projectData = projectSnapshot.data() as ProjectModel;
        const tokenData = await withAuthVerify(request);
        const {uid} = tokenData;

        if (!projectData){
            return NextResponse.json(
                { message: "Project not exist" },
                { status: StatusCode.NOT_FOUND }
            );
        }

        if (uid != projectData.uid){
            return NextResponse.json(
                { message: "you have no permission to edit this project"},
                { status: StatusCode.UNAUTHORIZED },
            );
        }

        if (projectData.status == ProjectStatus.DRAFT){
            const body : EditDraftProjectPayload = await request.json();
            await projectDoc.update({
                name: body.name || projectData.name,
                images: body.images || projectData.images,
                description: body.description || projectData.description,
                address: body.address || projectData.address,
                status: body.status || projectData.status,
                categories: body.categories || projectData.categories,
                stages: body.stages || projectData.stages,
                story: body.story || projectData.story,
                update: body.update || projectData.update,
                website: body.website || projectData.website,
                //payment: body.payment || projectData.payment
            });
        }
        else if (projectData.status == ProjectStatus.RUNNING){
            const body : EditRunningProjectPayload = await request.json();
            await projectDoc.update({
                description: body.description || projectData.description,
                status: body.status || projectData.status,
                story: body.story || projectData.story,
                update: body.update || projectData.update,
                website: body.website || projectData.website,
            });
        }
        else{ //Success and Fail cant edit rn
            return NextResponse.json(
                { message: "you can not edit this project"},
                { status: StatusCode.BAD_REQUEST },
            );
        }

        return NextResponse.json(
            { message: "edit project data successful"},
            { status: StatusCode.SUCCESS },
        );
    }
    catch (error : any) {
        return errorHandler(error);
    }
}
