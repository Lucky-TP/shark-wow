import { NextRequest, NextResponse } from "next/server";
import { CollectionPath } from "src/constants/firestore";
import { StatusCode } from "src/constants/statusCode";
import { getUser } from "src/libs/databases/users";
import { errorHandler } from "src/libs/errors/apiError";
import { withAuthVerify } from "src/utils/api/auth";
import { EditUserPayload } from "src/interfaces/payload/userPayload";
import { CommentData } from "src/interfaces/datas/comment";
import { UserData } from "src/interfaces/datas/user";
import { getCollectionRef } from "src/libs/databases/firestore";
import { ProjectModel } from "src/interfaces/models/project";
import { updateUser } from "src/libs/databases/users/updateUser";
import { getComments } from "src/libs/databases/comments";

export async function GET(request: NextRequest) {
    //get user info
    try {
        const tokenData = await withAuthVerify(request);
        const retrivedUser = await getUser(tokenData.uid);

        // get own project datas
        const ownProjects: ProjectModel[] = [];
        if (retrivedUser.ownProjectIds.length > 0) {
            const projectCollection = getCollectionRef(CollectionPath.PROJECT);
            const querySnapshot = await projectCollection
                .where("projectId", "in", retrivedUser.ownProjectIds)
                .get();
            querySnapshot.docs.forEach((doc) => {
                if (doc.exists) {
                    const project = doc.data() as ProjectModel;
                    ownProjects.push(project);
                }
            });
        }

        const receivedComments: CommentData[] = await getComments(retrivedUser.receivedCommentIds);
        const { receivedCommentIds, ownProjectIds, ...extractedUser } = retrivedUser;
        const userData: UserData = {
            ...extractedUser,
            ownProjects,
            receivedComments,
        };

        return NextResponse.json(
            { message: "Retrived user successful", data: userData },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}

export async function PUT(request: NextRequest) {
    //edit user info
    try {
        const tokenData = await withAuthVerify(request);
        const uid = tokenData.uid;
        const body: Partial<EditUserPayload> = await request.json();
        await updateUser(uid, body);
        return NextResponse.json(
            { message: "Update user successful" },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
