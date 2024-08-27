import { NextRequest, NextResponse } from "next/server";
import { CollectionPath } from "src/constants/firestore";
import { StatusCode } from "src/constants/statusCode";
import { getUser } from "src/libs/databases/users";
import { getDocRef } from "src/libs/databases/firestore";
import { errorHandler } from "src/libs/errors/apiError";
import { withAuthVerify } from "src/utils/auth";
import { EditUserPayload } from "src/interfaces/payload/userPayload";
import { UserModel } from "src/interfaces/models/user";
import {
    CommentCreator,
    CommentReply,
    UserData,
} from "src/interfaces/models/common";
import { getCollectionRef } from "src/libs/databases/firestore";
import { CommentCreatorModel } from "src/interfaces/models/commentCreator";
import { CommentReplyModel } from "src/interfaces/models/commentReply";
import { GetUserResponse } from "src/interfaces/response/userResponse";
import { ProjectModel } from "src/interfaces/models/project";

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

        // get recvied comment datas
        const receivedComments: CommentCreator[] = [];
        if (retrivedUser.receivedCommentIds.length > 0) {
            const commentCreatorCollection = getCollectionRef(
                CollectionPath.COMMENTCREATOR
            );
            const querySnapshot = await commentCreatorCollection
                .where("commentId", "in", retrivedUser.receivedCommentIds)
                .get();

            const replyCommentCollection = getCollectionRef(
                CollectionPath.COMMENTREPLY
            );
            await Promise.all(
                querySnapshot.docs.map(async (commentDoc) => {
                    const baseComment =
                        commentDoc.data() as CommentCreatorModel;
                    const repliedComments: CommentReply[] = [];
                    if (baseComment.replyIds.length > 0) {
                        const replyWithCommentId = await replyCommentCollection
                            .where("replyId", "in", baseComment.replyIds)
                            .get();

                        replyWithCommentId.forEach((reply) => {
                            const commentReply =
                                reply.data() as CommentReplyModel;
                            repliedComments.push(commentReply);
                        });
                    }
                    const commentCreator: CommentCreator = {
                        commentId: baseComment.commentId,
                        creatorUid: baseComment.creatorUid,
                        ownerUid: baseComment.ownerUid,
                        replys: repliedComments,
                        date: baseComment.date,
                        detail: baseComment.detail,
                    };
                    receivedComments.push(commentCreator);
                })
            );
        }

        const { receivedCommentIds, ownProjectIds, ...extractedUser } =
            retrivedUser;
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
        const { uid } = tokenData;

        // const formData = await request.formData();
        // const body: Partial<EditUserPayload> = Object.fromEntries(formData);

        // let promiseUploadImage: Promise<string> | undefined;
        // if (profileImageFile) {
        //     promiseUploadImage = uploadFile(
        //         profileImageFile,
        //         StoragePath.USER.PROFILE(uid)
        //     );
        // }
        // let promiseUploadCv: Promise<string> | undefined;
        // if (cvFile) {
        //     promiseUploadCv = uploadFile(cvFile, StoragePath.USER.CV(uid));
        // }

        const userDocRef = getDocRef(CollectionPath.USER, uid);
        const userSnapshot = await userDocRef.get();
        if (!userSnapshot.exists) {
            return NextResponse.json(
                { message: "User not exists" },
                { status: StatusCode.NOT_FOUND }
            );
        }

        // if (body.address) {
        //     body.address = JSON.parse(body.address as unknown as string);
        // }
        // if (body.contact) {
        //     body.contact = JSON.parse(body.contact as unknown as string);
        // }

        // let profileImageUrl = "";
        // if (promiseUploadImage) {
        //     profileImageUrl = await promiseUploadImage;
        // }
        // let cvUrl = "";
        // if (promiseUploadCv) {
        //     cvUrl = await promiseUploadCv;
        // }

        const body: Partial<EditUserPayload> = await request.json();
        const currentUserData = userSnapshot.data() as UserModel;
        await userDocRef.update({
            firstName: body.firstName || currentUserData.firstName,
            lastName: body.lastName || currentUserData.lastName,
            aboutMe: body.aboutMe || currentUserData.aboutMe,
            address: body.address || currentUserData.address,
            contact: body.contact || currentUserData.contact,
            profileImageUrl:
                body.profileImageUrl || currentUserData.profileImageUrl,
            cvUrl: body.cvUrl || currentUserData.cvUrl,
        });

        return NextResponse.json(
            { message: "Update user successful" },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
