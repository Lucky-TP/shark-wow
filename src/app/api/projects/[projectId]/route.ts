import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "src/libs/errors/apiError";
import { StatusCode } from "src/constants/statusCode";
import { ProjectModel, Update } from "src/interfaces/models/project";
import { getDocRef } from "src/libs/databases/firestore";
import { CollectionPath } from "src/constants/firestore";
import { ProjectStatus } from "src/interfaces/models/enums";
import { withAuthVerify } from "src/utils/auth";
import { EditProjectPayload } from "src/interfaces/payload/projectPayload";
import { CommentData } from "src/interfaces/models/common";
import { getComments } from "src/libs/databases/comments";
import { updateProject } from "src/libs/databases/projects";

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
        const uid = tokenData.uid;

        const projectDocRef = getDocRef(CollectionPath.PROJECT, params.projectId);
        const projectSnapshot = await projectDocRef.get();
        if (!projectSnapshot.exists) {
            return NextResponse.json(
                { message: "Project not exist" },
                { status: StatusCode.NOT_FOUND }
            );
        }

        const currentProjectData = projectSnapshot.data() as ProjectModel;
        const projectId = currentProjectData.projectId;
        if (uid !== currentProjectData.uid) {
            return NextResponse.json(
                { message: "You have no permission to update this project" },
                { status: StatusCode.UNAUTHORIZED }
            );
        }

        const body: Partial<EditProjectPayload> = await request.json();
        if (currentProjectData.status === ProjectStatus.DRAFT) {
            await updateProject(projectId, {
                name: body.name,
                carouselImageUrls: body.carouselImageUrls,
                description: body.description,
                address: body.address,
                status: body.status,
                category: body.category,
                stages: body.stages,
                story: body.story,
                update: body.update,
                website: body.website,
            });
        } else if (currentProjectData.status === ProjectStatus.RUNNING) {
            await updateProject(projectId, {
                description: body.description,
                status: body.status,
                story: body.story,
                update: body.update,
                website: body.website,
            });
        } else {
            //Success and Fail cant edit rn
            return NextResponse.json(
                { message: "Project have no permission to update in this state" },
                { status: StatusCode.BAD_REQUEST }
            );
        }

        return NextResponse.json(
            { message: "Update project data successful" },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: any) {
        return errorHandler(error);
    }
}
