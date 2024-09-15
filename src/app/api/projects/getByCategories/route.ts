import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "src/libs/errors/apiError";
import { getCollectionRef } from "src/libs/databases/firestore";
import { CollectionPath } from "src/constants/firestore";
import { ShowProject } from "src/interfaces/datas/project";
import { StatusCode } from "src/constants/statusCode";
import { ProjectStatus } from "src/interfaces/models/enums";

/**
 * @swagger
 * /api/projects/getByCategories:
 *   get:
 *     tags:
 *       - projects
 *     description: Retrieve projects filtered by specified categories.
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: List of categories to filter projects by. Multiple values can be provided.
 *     responses:
 *       200:
 *         description: Successfully retrieved projects filtered by categories
 *       400:
 *         description: Bad request - Categories parameter is missing or empty
 *       500:
 *         description: Failed to retrieve projects
 */

export async function GET(request: NextRequest) {
    try {
        const categories = request.nextUrl.searchParams.getAll("category");
        if (!categories || categories.length === 0) {
            return NextResponse.json(
                { message: "Categories parameter is missing or empty" },
                { status: StatusCode.BAD_REQUEST }
            );
        }
        const projectCollection = getCollectionRef(CollectionPath.PROJECT);
        const querySnapshot = await projectCollection
            .where("category", "in", categories)
            .where("status", "!=", ProjectStatus.DRAFT)
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
