import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { withAuthVerify } from "src/utils/withAuth";
import { StatusCode } from "src/constants/statusCode";
import { errorHandler } from "src/utils/errors/errorHandler";

export async function GET(request: NextRequest) {
    try {
        await withAuthVerify(request);
        const cookieStore = cookies();
        cookieStore.getAll().forEach(({ name }) => cookieStore.delete(name));
        return NextResponse.json(
            { message: "Clear authentication successful" },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: any) {
        errorHandler(error);
    }
}
