"use server";
import { NextRequest } from "next/server";
import { USER_TOKEN } from "src/constants/cookiesKeyName";
import { verifyToken } from "./jwt";
import { UserToken } from "src/interfaces/token";
import { CustomError } from "./errors/customError";
import { StatusCode } from "src/constants/statusCode";

export async function withAuth(request: NextRequest) {
    const userToken = request.cookies.get(USER_TOKEN)?.value;
    if (!userToken) {
        throw new CustomError("Unauthorized", StatusCode.UNAUTHORIZED);
    }
    return userToken;
}

export async function withAuthAndVerify(request: NextRequest) {
    const userToken = await withAuth(request);
    return verifyToken(userToken) as UserToken;
}
