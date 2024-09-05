import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "src/libs/errors/apiError";
import { StatusCode } from "src/constants/statusCode";
import { CollectionPath } from "src/constants/firestore";
import { getCollectionRef } from "src/libs/databases/firestore";
import { ProjectModel } from "src/interfaces/models/project";
import { ProjectStatus, StageId } from "src/interfaces/models/enums";
import { ShowProject } from "src/interfaces/datas/project";

export async function GET(request: NextRequest) {
    try {
        const projectCollection = getCollectionRef(CollectionPath.PROJECT);
        const querySnapshot = await projectCollection
            .where("status", "==", ProjectStatus.RUNNING)
            .select(
                "projectId",
                "name",
                "carouselImageUrls",
                "description",
                "stages",
                "status",
                "category"
            )
            .orderBy("totalSupporter", "desc")
            .limit(10)
            .get();
        const topTenProjects: ShowProject[] = querySnapshot.docs.map(
            (project) => project.data() as ShowProject
        );

        return NextResponse.json(
            { message: "retrieve 10 popular project successful", data: topTenProjects },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: any) {
        return errorHandler(error);
    }
}
