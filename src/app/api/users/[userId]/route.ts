import { NextRequest, NextResponse } from "next/server";
import { StatusCode } from "src/constants/statusCode";
import { ShowProject } from "src/interfaces/datas/project";
import { PublicUserData } from "src/interfaces/datas/user";
import { ProjectStatus } from "src/interfaces/models/enums";
import { getProjects } from "src/libs/databases/projects/getProjects";
import { getUser } from "src/libs/databases/users";
import { errorHandler } from "src/libs/errors/apiError";

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
    try {
        const uid = params.userId;
        const userModel = await getUser(uid);

        const projectModels = await getProjects(userModel.ownProjectIds);
        const projectSummarizes: ShowProject[] = projectModels
            .filter((projectModel) => projectModel.status !== ProjectStatus.DRAFT)
            .map((projectModel) => {
                return {
                    projectId: projectModel.projectId,
                    name: projectModel.name,
                    carouselImageUrls: projectModel.carouselImageUrls,
                    description: projectModel.description,
                    stages: projectModel.stages,
                    category: projectModel.category,
                };
            });

        const publicUserData: PublicUserData = {
            uid: userModel.uid,
            username: userModel.username,
            firstName: userModel.firstName,
            lastName: userModel.lastName,
            aboutMe: userModel.aboutMe,
            email: userModel.email,
            profileImageUrl: userModel.profileImageUrl,
            popularDetail: userModel.popularDetail,
            receivedCommentIds: userModel.receivedCommentIds,
            contact: userModel.contact,
            cvUrl: userModel.cvUrl,
            projectSummarizes,
        };
        return NextResponse.json(
            { message: "Get user successful", data: publicUserData },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
