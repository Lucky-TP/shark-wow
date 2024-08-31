import { NextRequest, NextResponse } from "next/server";
import { getUser } from "src/libs/databases/users";
import { updateUser } from "src/libs/databases/users/updateUser";
import { errorHandler } from "src/libs/errors/apiError";
import { withAuthVerify } from "src/utils/api/auth";
import { StatusCode } from "src/constants/statusCode";

export async function PUT(request: NextRequest, { params }: { params: { projectId: string } }) {
    const newProjectId = params.projectId;
    try {
        const tokenData = await withAuthVerify(request);
        const retrivedUser = await getUser(tokenData.uid);

        let newFavoriteProjectIds: string[] = [];
        const favoriteProjectIds = retrivedUser.favoriteProjectIds;
        if (favoriteProjectIds.includes(newProjectId)) {
            newFavoriteProjectIds = favoriteProjectIds.filter(
                (existedProjectId) => existedProjectId !== newProjectId
            );
        } else {
            newFavoriteProjectIds = [...newFavoriteProjectIds, newProjectId];
        }
        await updateUser(tokenData.uid, { favoriteProjectIds: newFavoriteProjectIds });
        return NextResponse.json(
            { message: "Update favorite project successful" },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
