import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "src/libs/errors/apiError";
import { getCollectionRef } from "src/libs/databases/firestore/commons";
import { CollectionPath } from "src/constants/firestore";
import { ShowProject } from "src/interfaces/datas/project";
import { StatusCode } from "src/constants/statusCode";
import { ProjectStatus } from "src/interfaces/models/enums";

export async function GET(request: NextRequest) {
    try {
        const projectName = request.nextUrl.searchParams.get("search");
        if (!projectName || projectName.length === 0) {
            return NextResponse.json(
                { message: "Get default page" },
                { status: StatusCode.SUCCESS }
            );
        }
        const projectCollection = getCollectionRef(CollectionPath.PROJECT);
        const querySnapshot = await projectCollection
            .where("name", ">=", projectName)
            .where("name", "<=", projectName+"\uf8ff")
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
            .get();
        const projectInCategories: ShowProject[] = querySnapshot.docs.map(
            (project) => project.data() as ShowProject
        );

        return NextResponse.json(
            {
                message: "Retrieved all project by categories successful",
                data: projectInCategories,
            },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
