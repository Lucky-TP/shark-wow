import { NextRequest, NextResponse } from "next/server";
import { CollectionPath } from "src/constants/firestore";
import { StatusCode } from "src/constants/statusCode";
import { getUser } from "src/libs/databases/users";
import { errorHandler } from "src/libs/errors/apiError";
import { withAuthVerify } from "src/utils/auth";
import { EditUserPayload } from "src/interfaces/payload/userPayload";
import { CommentData, UserData } from "src/interfaces/models/common";
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
        // // get recvied comment datas
        // const receivedComments: CommentData[] = [];
        // if (retrivedUser.receivedCommentIds.length > 0) {
        //     const commentCollection = getCollectionRef(CollectionPath.COMMENT);
        //     const querySnapshot = await commentCollection
        //         .where("commentId", "in", retrivedUser.receivedCommentIds)
        //         .get();

        //     const replyCollection = getCollectionRef(CollectionPath.REPLY);
        //     await Promise.all(
        //         querySnapshot.docs.map(async (commentDoc) => {
        //             const baseComment = commentDoc.data() as CommentModel;
        //             const repliedComments: ReplyModel[] = [];
        //             if (baseComment.replyIds.length > 0) {
        //                 const replyWithCommentId = await replyCollection
        //                     .where("replyId", "in", baseComment.replyIds)
        //                     .get();

        //                 replyWithCommentId.forEach((reply) => {
        //                     const retrivedReply = reply.data() as ReplyModel;
        //                     repliedComments.push(retrivedReply);
        //                 });
        //             }
        //             const comment: CommentData = {
        //                 commentId: baseComment.commentId,
        //                 authorId: baseComment.authorId,
        //                 detail: baseComment.detail,
        //                 createAt: baseComment.createAt,
        //                 updateAt: baseComment.updateAt,
        //                 replys: repliedComments,
        //             };
        //             receivedComments.push(comment);
        //         })
        //     );
        // }

        const { receivedCommentIds, ownProjectIds, ...extractedUser } = retrivedUser;
        const dataUser: UserData = {
            ...extractedUser,
            ownProjects,
            receivedComments,
        };

        return NextResponse.json(
            { message: "Retrived user successful", data: dataUser },
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
