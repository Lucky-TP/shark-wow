import { NextRequest, NextResponse } from "next/server";
import { StatusCode } from "src/constants/statusCode";
import { getUser } from "src/databases/firestore/userDoc";
import { errorHandler } from "src/utils/errors/errorHandler";
import { withAuthVerify } from "src/utils/withAuth";

export async function GET(request: NextRequest) {
    try {
        const tokenData = await withAuthVerify(request);
        const retrivedUser = await getUser(tokenData.uid);
        return NextResponse.json(
            { message: "Retrived user successful", data: retrivedUser },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: any) {
        return errorHandler(error);
    }
}
