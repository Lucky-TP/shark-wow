"use server";
import { NextRequest } from "next/server";
import { verifyJWT } from "./jose";
import { CustomError } from "../../libs/errors/apiError";
import { USER_TOKEN } from "src/constants/cookiesKeyName";
import { StatusCode } from "src/constants/statusCode";

export async function withAuthVerify(request: NextRequest) {
    const userToken = request.cookies.get(USER_TOKEN)?.value;
    if (!userToken) {
        throw new CustomError("Unauthorized", StatusCode.UNAUTHORIZED);
    }
    const userTokenData = await verifyJWT(userToken);
    if (!userTokenData) {
        throw new CustomError("Invalid token", StatusCode.UNAUTHORIZED);
    }
    return userTokenData;
}
