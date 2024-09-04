import { NextRequest, NextResponse } from "next/server";
import { getDocRef } from "src/libs/databases/firestore";
import { errorHandler } from "src/libs/errors/apiError";
import { getComments } from "src/libs/databases/comments";
import { updateProject } from "src/libs/databases/projects";
import { withAuthVerify } from "src/utils/api/auth";
import { StatusCode } from "src/constants/statusCode";
import { CollectionPath } from "src/constants/firestore";
import { ProjectModel, Stage } from "src/interfaces/models/project";
import { ProjectStatus } from "src/interfaces/models/enums";
import { CommentData } from "src/interfaces/datas/comment";
import { ProjectData } from "src/interfaces/datas/project";
import { EditProjectPayload } from "src/interfaces/payload/projectPayload";
import { getCurrentStage } from "src/utils/api/projects/getCurrentStage";
import { getStartAndExpireTime } from "src/utils/api/projects";

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
        const projectModel = projectSnapshot.data() as ProjectModel;
        if (projectModel.status === ProjectStatus.DRAFT) {
            const projectOwner = await withAuthVerify(request);
            if (projectModel.uid !== projectOwner.uid) {
                return NextResponse.json(
                    { message: "No permission to access draft project" },
                    { status: StatusCode.UNAUTHORIZED }
                );
            }
        }

        const projectTime = getStartAndExpireTime(projectModel.stages);
        const currentStage = getCurrentStage(projectModel.stages);
        const discussions: CommentData[] = await getComments(projectModel.discussionIds);
        const projectData: ProjectData = {
            projectId: projectModel.projectId,
            uid: projectModel.uid,
            name: projectModel.name,
            carouselImageUrls: projectModel.carouselImageUrls,
            description: projectModel.description,
            address: projectModel.address,
            totalSupporter: projectModel.totalSupporter,
            status: projectModel.status,
            category: projectModel.category,
            totalQuantity: projectModel.totalQuantity,
            costPerQuantity: projectModel.costPerQuantity,
            stages: projectModel.stages,
            story: projectModel.story,
            discussion: discussions,
            update: projectModel.update,
            website: projectModel.website,
            payment: projectModel.payment,
            startDate: projectTime.startDate,
            expireDate: projectTime.expireDate,
            currentStage,
        };
        return NextResponse.json(
            { message: "Get project data successful", data: projectData },
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

        const currentProjectModel = projectSnapshot.data() as ProjectModel;
        const projectId = currentProjectModel.projectId;
        if (uid !== currentProjectModel.uid) {
            return NextResponse.json(
                { message: "You have no permission to update this project" },
                { status: StatusCode.UNAUTHORIZED }
            );
        }

        const body: Partial<EditProjectPayload> = await request.json();
        if (currentProjectModel.status === ProjectStatus.DRAFT) {
            await updateProject(projectId, {
                name: body.name,
                carouselImageUrls: body.carouselImageUrls,
                description: body.description,
                address: body.address,
                status: body.status, // implement to check if every field is filled before it could change the status (in short "IMPLEMENT LATER")
                category: body.category,
                totalQuantity: body.totalQuantity,
                costPerQuantity: body.costPerQuantity,
                stages: body.stages,
                story: body.story,
                update: body.update,
                website: body.website,
            });
        } else if (currentProjectModel.status === ProjectStatus.RUNNING) {
            await updateProject(projectId, {
                description: body.description,
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
            { message: "Update project successful" },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
