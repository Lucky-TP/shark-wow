import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "src/libs/errors/apiError";
import { CollectionPath } from "src/constants/firestore";
import { withAuthVerify } from "src/utils/auth";
import { getNextId } from "src/libs/databases/metadata";
import {
    MetadataId,
    ProjectStatus,
    StageId,
    StageStatus,
} from "src/interfaces/models/enums";
import { StatusCode } from "src/constants/statusCode";
import { getDocRef } from "src/libs/databases/firestore";
import { UserModel } from "src/interfaces/models/user";
import { ProjectModel } from "src/interfaces/models/project";
import { addNewProject } from "src/libs/databases/projects";

export async function POST(request: NextRequest) {
    try {
        const tokenData = await withAuthVerify(request);
        const { uid } = tokenData;
        const newProjectId = await getNextId(MetadataId.PROJECT);

        const userDocRef = getDocRef(CollectionPath.USER, uid);
        const userSnapshot = await userDocRef.get();

        const currentUserData = userSnapshot.data() as UserModel;
        await userDocRef.update({
            ownProjectIds: [...currentUserData.ownProjectIds, newProjectId],
        });

        const newProject: ProjectModel = {
            projectId: newProjectId,
            uid: uid,
            name: "",
            images: [],
            description: "",
            address: {
                country: "",
                city: "",
                province: "",
                postalCode: "",
            },
            totalSupporter: 0,
            status: ProjectStatus.DRAFT,
            categories: "",
            stages: [
                {
                    stageId: StageId.CONCEPT,
                    name: "Concept",
                    status: StageStatus.NOT_USE,
                    detail: "",
                    imageUrl: "",
                    currentFunding: 0,
                    goalFunding: -1,
                    totalSupporter: 0,
                },
                {
                    stageId: StageId.PROTOTYPE,
                    name: "Prototype",
                    status: StageStatus.NOT_USE,
                    detail: "",
                    imageUrl: "",
                    currentFunding: 0,
                    goalFunding: -1,
                    totalSupporter: 0,
                },
                {
                    stageId: StageId.PRODUCTION,
                    name: "Production",
                    status: StageStatus.NOT_USE,
                    detail: "",
                    imageUrl: "",
                    currentFunding: 0,
                    goalFunding: -1,
                    totalSupporter: 0,
                },
            ],
            story: "",
            discussion: [],
            update: [],
            website: "",
        };

        await addNewProject(newProject);
        return NextResponse.json(
            {
                message:
                    "Create draft project and update user project successful",
            },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
