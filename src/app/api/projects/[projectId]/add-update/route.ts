import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { StatusCode } from "src/constants/statusCode";
import { StageId } from "src/interfaces/models/enums";
import { Update } from "src/interfaces/models/project";
import { AddNewUpdateToProjectPayload } from "src/interfaces/payload/projectPayload";
import { getProject, updateProject } from "src/libs/databases/firestore/projects";
import { withAuthVerify } from "src/utils/api/auth";
import { dateToString } from "src/utils/date";
import { errorHandler } from "src/libs/errors/apiError";

/**
 * @swagger
 * /api/projects/{projectId}/add-update:
 *   patch:
 *     tags:
 *       - projects
 *     summary: Add a new update to a project
 *     description: Allows the project owner to add a new update log to their project.
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - detail
 *             properties:
 *               detail:
 *                 type: string
 *                 description: The update log detail
 *               belongTo:
 *                 type: string
 *                 description: The stage ID (optional)
 *     responses:
 *       200:
 *         description: Successfully added a new update
 *       400:
 *         description: Invalid request or permission denied
 *       403:
 *         description: Forbidden, not authorized
 *       500:
 *         description: Server error
 */

export async function PATCH(request: NextRequest, { params }: { params: { projectId: string } }) {
    try {
        const tokenData = await withAuthVerify(request);
        const body: AddNewUpdateToProjectPayload = await request.json();

        const retrivedProjectModel = await getProject(params.projectId);
        const { projectId, uid: projectOwnerId, update: retrivedUpdates } = retrivedProjectModel;
        if (projectOwnerId !== tokenData.uid) {
            return NextResponse.json(
                { message: "You have no permission to add new update to this project" },
                { status: StatusCode.BAD_REQUEST }
            );
        }

        const newUpdate: Update = {
            id: uuidv4(),
            title: body.title,
            detail: body.detail,
            date: dateToString(new Date()),
            belongTo: body.belongTo ?? StageId.UNDEFINE,
        };
        const newUpdates = [...retrivedUpdates, newUpdate];
        await updateProject(projectId, { update: newUpdates });

        return NextResponse.json(
            { message: "Successful add new update log to project" },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
