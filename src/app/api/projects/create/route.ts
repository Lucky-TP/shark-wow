import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "src/libs/errors/apiError";
import { CollectionPath } from "src/constants/firestore";
import { withAuthVerify } from "src/utils/api/auth";
import { ProjectStatus, StageId, StageStatus } from "src/interfaces/models/enums";
import { StatusCode } from "src/constants/statusCode";
import { getDocRef } from "src/libs/databases/firestore";
import { UserModel } from "src/interfaces/models/user";
import { ProjectModel } from "src/interfaces/models/project";
import { addNewProject } from "src/libs/databases/firestore/projects";
import { updateUser } from "src/libs/databases/firestore/users";
import { dateToString } from "src/utils/date";

/**
 * @swagger
 * /api/projects/create:
 *   post:
 *     tags:
 *       - projects
 *     description: Create a new project.
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully created a draft project and updated the user's project list
 *       401:
 *         description: Unauthorized - Missing or invalid token
 */

export async function POST(request: NextRequest) {
    try {
        const tokenData = await withAuthVerify(request);

        const uid = tokenData.uid;
        const userDocRef = getDocRef(CollectionPath.USER, uid);
        const userSnapshot = await userDocRef.get();

        const newProjectModel: ProjectModel = {
            projectId: "",
            uid: uid,
            name: "",
            carouselImageUrls: [],
            description: "",
            address: {
                country: "",
                city: "",
                province: "",
                postalCode: "",
            },
            totalSupporter: 0,
            totalQuantity: 0,
            costPerQuantity: 0,
            status: ProjectStatus.DRAFT,
            category: "",
            stages: [
                {
                    stageId: StageId.CONCEPT,
                    name: "Concept",
                    status: StageStatus.NOT_USE,
                    detail: "",
                    imageUrl: "",
                    fundingCost: 0,
                    currentFunding: 0,
                    goalFunding: 1,
                    totalSupporter: 0,
                    startDate: dateToString(new Date()),
                    expireDate: dateToString(new Date()),
                },
                {
                    stageId: StageId.PROTOTYPE,
                    name: "Prototype",
                    status: StageStatus.NOT_USE,
                    detail: "",
                    imageUrl: "",
                    fundingCost: 0,
                    currentFunding: 0,
                    goalFunding: 1,
                    totalSupporter: 0,
                    startDate: dateToString(new Date()),
                    expireDate: dateToString(new Date()),
                },
                {
                    stageId: StageId.PRODUCTION,
                    name: "Production",
                    status: StageStatus.NOT_USE,
                    detail: "",
                    imageUrl: "",
                    fundingCost: 0,
                    currentFunding: 0,
                    goalFunding: 1,
                    totalSupporter: 0,
                    startDate: dateToString(new Date()),
                    expireDate: dateToString(new Date()),
                },
            ],
            story: "",
            discussionIds: [],
            update: [],
            website: "",
        };

        const newProjectId = await addNewProject(newProjectModel);
        const currentUserModel = userSnapshot.data() as UserModel;
        await updateUser(uid, {
            ownProjectIds: [...currentUserModel.ownProjectIds, newProjectId],
        });
        return NextResponse.json(
            {
                message: "Create draft project and update user's project successful",
                data: { projectId: newProjectId },
            },
            { status: StatusCode.CREATED }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
