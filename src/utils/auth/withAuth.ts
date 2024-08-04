"use server";
import { NextRequest } from "next/server";
import { verifyToken } from "./jwt";
import { CustomError } from "../../libs/errors/apiError";
import { UserToken } from "src/interfaces/token";
import { USER_TOKEN } from "src/constants/cookiesKeyName";
import { StatusCode } from "src/constants/statusCode";

export async function withAuthVerify(request: NextRequest) {
    const userToken = request.cookies.get(USER_TOKEN)?.value;
    if (!userToken) {
        throw new CustomError("Unauthorized", StatusCode.UNAUTHORIZED);
    }
    return verifyToken(userToken) as UserToken;
}
