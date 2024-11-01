import { NextRequest, NextResponse } from "next/server";
import { getDocRef } from "src/libs/databases/firestore/commons";
import { errorHandler } from "src/libs/errors/apiError";
import { getComments } from "src/libs/databases/firestore/comments";
import { updateProject } from "src/libs/databases/firestore/projects";
import { withAuthVerify } from "src/utils/api/auth";
import { StatusCode } from "src/constants/statusCode";
import { CollectionPath } from "src/constants/firestore";
import { ProjectModel, Stage } from "src/interfaces/models/project";
import { ProjectStatus, StageStatus } from "src/interfaces/models/enums";
import { CommentData } from "src/interfaces/datas/comment";
import { ProjectData } from "src/interfaces/datas/project";
import { EditProjectPayload } from "src/interfaces/payload/projectPayload";
import { getCurrentStage } from "src/utils/api/projects/getCurrentStage";
import { getStartAndExpireTime } from "src/utils/api/projects";
import { increaseTotalViewer } from "src/libs/databases/realtimeDatabase/server/projects/increaseTotalViewer";

/**
 * @swagger
 * /api/projects/{projectId}:
 *   get:
 *     tags:
 *       - projects
 *     description: Retrieve project information by its ID.
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique identifier of the project.
 *     responses:
 *       200:
 *         description: Successfully retrieved project information.
 *       401:
 *         description: Unauthorized - Missing or invalid token.
 *
 *   put:
 *     tags:
 *       - projects
 *     description: Update project details based on the project status. Updates fields according to the project's current status.
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the project to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the project
 *               carouselImageUrls:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of URLs for carousel images
 *               description:
 *                 type: string
 *                 description: A description of the project
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   zipcode:
 *                     type: string
 *                 description: The address of the project
 *               status:
 *                 type: string
 *                 description: The status of the project (e.g., 'DRAFT', 'RUNNING')
 *               category:
 *                 type: string
 *                 description: The category of the project
 *               totalQuantity:
 *                 type: integer
 *                 description: The total quantity of items
 *               costPerQuantity:
 *                 type: number
 *                 format: float
 *                 description: The cost per quantity of items
 *               stages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     stageId:
 *                       type: string
 *                       description: The ID of the stage
 *                     name:
 *                       type: string
 *                       description: The name of the stage
 *                     startDate:
 *                       type: string
 *                       format: date
 *                       description: The start date of the stage
 *                     expireDate:
 *                       type: string
 *                       format: date
 *                       description: The expiration date of the stage
 *                     status:
 *                       type: string
 *                       description: The status of the stage (e.g., 'ACTIVE', 'COMPLETED')
 *                     detail:
 *                       type: string
 *                       description: Detailed description of the stage
 *                     imageUrl:
 *                       type: string
 *                       description: URL of the image associated with the stage
 *                     fundingCost:
 *                       type: number
 *                       format: float
 *                       description: The funding cost required for the stage
 *                     currentFunding:
 *                       type: number
 *                       format: float
 *                       description: The current amount of funding received
 *                     goalFunding:
 *                       type: number
 *                       format: float
 *                       description: The goal amount of funding needed
 *                     totalSupporter:
 *                       type: integer
 *                       description: The total number of supporters for the stage
 *                 description: List of stages in the project
 *               story:
 *                 type: string
 *                 description: The story or background of the project
 *               update:
 *                 type: string
 *                 description: Updates or recent changes to the project
 *               website:
 *                 type: string
 *                 description: The URL of the project's website
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       400:
 *         description: Bad request - Invalid or missing data
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: Not found - Project with the specified ID does not exist
 *       500:
 *         description: Internal server error - Something went wrong
 */

export const revalidate = 15;

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
        if (projectModel.status === ProjectStatus.RUNNING) {
            const projectOwner = await withAuthVerify(request);
            if (projectModel.uid !== projectOwner.uid) {
                return NextResponse.json(
                    { message: "No permission to access draft project" },
                    { status: StatusCode.BAD_REQUEST }
                );
            }
        }

        const projectTime = getStartAndExpireTime(projectModel.stages);
        const currentStage = getCurrentStage(projectModel.stages);

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
            discussionIds: projectModel.discussionIds,
            stages: projectModel.stages,
            story: projectModel.story,
            update: projectModel.update,
            website: projectModel.website,
            startDate: projectTime.startDate,
            expireDate: projectTime.expireDate,
            accountBank: projectModel.accountBank,
            accountHolderName: projectModel.accountHolderName,
            accountNumber: projectModel.accountNumber,
            currentStage,
        };
        if (projectModel.status === ProjectStatus.RUNNING) {
            await increaseTotalViewer(params.projectId);
        }
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
                //status: body.status,  //implement to check if every field is filled before it could change the status (in short "IMPLEMENT LATER")
                category: body.category,
                totalQuantity: body.totalQuantity,
                costPerQuantity: body.costPerQuantity,
                stages: body.stages,
                story: body.story,
                update: body.update,
                website: body.website,
                accountBank: body.accountBank,
                accountHolderName: body.accountHolderName,
                accountNumber: body.accountNumber,
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
                {
                    message: "Project have no permission to update in this state",
                },
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

export async function PATCH(request: NextRequest, { params }: { params: { projectId: string } }) {
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

        if (currentProjectModel.status !== ProjectStatus.RUNNING) {
            return NextResponse.json(
                {
                    message: "Something went wrong.",
                },
                { status: StatusCode.BAD_REQUEST }
            );
        }

        const projectStage = currentProjectModel.stages as Stage[];

        if (
            projectStage[0].status === StageStatus.CURRENT &&
            projectStage[0].currentFunding >= projectStage[0].goalFunding
        ) {
            projectStage[0].status = StageStatus.FINISH;
            projectStage[1].status = StageStatus.CURRENT;
        } else if (
            projectStage[1].status === StageStatus.CURRENT &&
            projectStage[1].currentFunding >= projectStage[1].goalFunding
        ) {
            projectStage[1].status = StageStatus.FINISH;
            projectStage[2].status = StageStatus.CURRENT;
        } else if (
            projectStage[2].status === StageStatus.CURRENT &&
            projectStage[2].currentFunding >= projectStage[2].goalFunding
        ) {
            projectStage[2].status = StageStatus.FINISH;
            await updateProject(projectId, {
                status: ProjectStatus.SUCCESS,
                stages: projectStage,
            });
            return NextResponse.json(
                {
                    message: "End project successful.",
                },
                { status: StatusCode.SUCCESS }
            );
        } else {
            return NextResponse.json(
                {
                    message: "Something went wrong.",
                },
                { status: StatusCode.BAD_REQUEST }
            );
        }

        await updateProject(projectId, {
            status: ProjectStatus.PENDING,
            stages: projectStage,
        });

        return NextResponse.json(
            { message: "send a request to admin successful" },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
