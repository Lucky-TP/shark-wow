import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "src/libs/errors/apiError";
import { StatusCode } from "src/constants/statusCode";
import { ProjectModel } from "src/interfaces/models/project";
import { getDocRef } from "src/libs/databases/firestore";
import { CollectionPath } from "src/constants/firestore";
import { ProjectStatus } from "src/interfaces/models/enums";
import { withAuthVerify } from "src/utils/auth";
import { EditProjectPayload } from "src/interfaces/payload/projectPayload";
import { CommentData } from "src/interfaces/models/common";
import { getComments } from "src/libs/databases/comments";

export async function GET(request: NextRequest, { params }: { params: { projectId: string } }) {
    try {
        const projectDocRef = getDocRef(CollectionPath.PROJECT, params.projectId);
        const projectSnapshot = await projectDocRef.get();
        if (!projectSnapshot.exists) {
            return NextResponse.json(
                { message: "Project not exist" },
                { status: StatusCode.NOT_FOUND }
            );
        }
        const projectData = projectSnapshot.data() as ProjectModel;
        const discussion: CommentData[] = await getComments(projectData.discussionIds);
        const projectWithAllCommentData = {
            projectId: projectData.projectId,
            uid: projectData.uid,
            name: projectData.name,
            carouselImageUrls: projectData.carouselImageUrls,
            description: projectData.description,
            address: projectData.address,
            totalSupporter: projectData.totalSupporter,
            status: projectData.status,
            category: projectData.category,
            stages: projectData.stages,
            story: projectData.story,
            discussion: discussion,
            update: projectData.update,
            website: projectData.website,
            payment: projectData.payment,
        };
        return NextResponse.json(
            { message: "Get project data successful", data: projectWithAllCommentData },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}

export async function PUT(request: NextRequest, { params }: { params: { projectId: string } }) {
    try {
        const tokenData = await withAuthVerify(request);
        const { uid } = tokenData;

        const projectDocRef = getDocRef(CollectionPath.PROJECT, params.projectId);
        const projectSnapshot = await projectDocRef.get();
        if (!projectSnapshot.exists) {
            return NextResponse.json(
                { message: "Project not exist" },
                { status: StatusCode.NOT_FOUND }
            );
        }

        const projectData = projectSnapshot.data() as ProjectModel;
        if (uid !== projectData.uid) {
            return NextResponse.json(
                { message: "you have no permission to edit this project" },
                { status: StatusCode.UNAUTHORIZED }
            );
        }

        const body: Partial<EditProjectPayload> = await request.json();
        if (projectData.status == ProjectStatus.DRAFT) {
            await projectDocRef.update({
                name: body.name || projectData.name,
                carouselImageUrls: body.carouselImageUrls || projectData.carouselImageUrls,
                description: body.description || projectData.description,
                address: body.address || projectData.address,
                status: body.status || projectData.status,
                category: body.category || projectData.category,
                stages: body.stages || projectData.stages,
                story: body.story || projectData.story,
                update: body.update || projectData.update,
                website: body.website || projectData.website,
                //payment: body.payment || projectData.payment
            });
        } else if (projectData.status == ProjectStatus.RUNNING) {
            await projectDocRef.update({
                description: body.description || projectData.description,
                status: body.status || projectData.status,
                story: body.story || projectData.story,
                update: body.update || projectData.update,
                website: body.website || projectData.website,
            });
        } else {
            //Success and Fail cant edit rn
            return NextResponse.json(
                { message: "you can not edit this project" },
                { status: StatusCode.BAD_REQUEST }
            );
        }

        return NextResponse.json(
            { message: "Edit project data successful" },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: any) {
        return errorHandler(error);
    }
}
