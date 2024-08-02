import { NextRequest, NextResponse } from "next/server";
import { withAuthVerify } from "src/utils/withAuth";
import { StatusCode } from "src/constants/statusCode";
import { errorHandler } from "src/utils/errors/errorHandler";
import { clearUserSession } from "src/utils/cookie";

export async function GET(request: NextRequest) {
    try {
        await withAuthVerify(request);
        clearUserSession();
        return NextResponse.json(
            { message: "Clear authentication successful" },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: any) {
        return errorHandler(error);
    }
}
