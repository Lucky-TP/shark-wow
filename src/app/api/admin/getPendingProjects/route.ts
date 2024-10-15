import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "src/interfaces/models/enums";
import { withAuthVerify } from "src/utils/api/auth";
import { StatusCode } from "src/constants/statusCode";
import { getCollectionRef } from "src/libs/databases/firestore/commons";
import { ProjectStatus } from "src/interfaces/models/enums";
import { errorHandler } from "src/libs/errors/apiError";
import { CollectionPath } from "src/constants/firestore";
import { ShowProject } from "src/interfaces/datas/project";

export const revalidate = 15;

export async function GET(request: NextRequest) {
    try {
        const tokenData = await withAuthVerify(request);
        const userRole = tokenData.role;
        if (userRole !== UserRole.ADMIN) {
            return NextResponse.json(
                { message: "You have no permission." },
                { status: StatusCode.BAD_REQUEST }
            );
        }

        const projectCollection = getCollectionRef(CollectionPath.PROJECT);
        const querySnapshot = await projectCollection
            .where("status", "==", ProjectStatus.PENDING)
            .select(
                "projectId",
                "name",
                "carouselImageUrls",
                "description",
                "stages",
                "status",
                "category"
            )
            .get();
        const allPendingProject: ShowProject[] = querySnapshot.docs.map(
            (project) => project.data() as ShowProject
        );

        return NextResponse.json(
            { message: "Laucnh project successful.", data: allPendingProject },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: any) {
        return errorHandler(error);
    }
}
