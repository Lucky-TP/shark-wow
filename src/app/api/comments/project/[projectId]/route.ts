import { NextRequest, NextResponse } from "next/server";
import { createComment } from "src/libs/databases/comments/createComment";
import { errorHandler } from "src/libs/errors/apiError";
import { getProject, updateProject } from "src/libs/databases/projects";
import { CreateCommentPayload } from "src/interfaces/payload/commentPayload";
import { StatusCode } from "src/constants/statusCode";
import { withAuthVerify } from "src/utils/api/auth";

export async function POST(request: NextRequest, { params }: { params: { projectId: string } }) {
    try {
        const author = await withAuthVerify(request);
        const projectId = params.projectId;
        const body: CreateCommentPayload = await request.json();

        const commentId = await createComment(author.uid, body);
        const projectModel = await getProject(projectId);

        const newDiscussionIds = [...projectModel.discussionIds, commentId];
        await updateProject(projectId, { discussionIds: newDiscussionIds });
        return NextResponse.json(
            { message: "Create comment to project successful" },
            { status: StatusCode.CREATED }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
