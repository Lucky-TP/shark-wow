import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "src/utils/errors/errorHandler";
import { CollectionPath } from "src/constants/collection";
import { withAuthVerify } from "src/utils/withAuth";
import { getNextId } from "src/databases/firestore/metadataDoc";
import { MetadataId , ProjectStatus , StageId , StageStatus } from "src/interfaces/models/enums";
import { StatusCode } from "src/constants/statusCode";
import { getDocAndSnapshot } from "src/databases/firestore/utils";
import { UserModel } from "src/interfaces/models/user";
import { ProjectModel } from "src/interfaces/models/project";
import { addNewProject } from "src/databases/firestore/projectDoc";

export async function POST(request : NextRequest){
    try {
        const tokenData = await withAuthVerify(request);
        const {uid} = tokenData;
        const newProjectId = await getNextId(MetadataId.PROJECT);

        const { doc: userDoc, snapshot: userSnapshot } = await getDocAndSnapshot(CollectionPath.USER, tokenData.uid);
        const currentUserData = userSnapshot.data() as UserModel;
        await userDoc.update({
            ownProjectIds: [...currentUserData.ownProjectIds,newProjectId]
        });

        const newProject: ProjectModel = {
            projectId: newProjectId,
            uid: uid,
            name: "",
            images: [],
            description: "",
            address: "",
            totalSupporter: 0,
            status: ProjectStatus.DRAFT,
            categories: [],
            stages: [{
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
            }
            ],
            story: "",
            discussion: [],
            update: [],
            website: "",
        };

        await addNewProject(newProject);

        return NextResponse.json(
            { message: "create draft project and update user project successful"},
            { status: StatusCode.SUCCESS },
        );
    }
    catch (error : any){
        return errorHandler(error);
    }
}