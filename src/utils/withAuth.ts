"use server";
import { NextRequest } from "next/server";
import { USER_TOKEN } from "src/constants/cookiesKeyName";
import { verifyToken } from "./jwt";
import { UserToken } from "src/interfaces/token";

export async function withAuth(request: NextRequest) {
    const userToken = request.cookies.get(USER_TOKEN)?.value;
    if (!userToken) {
        throw new Error("Unauthorized");
    }
    return userToken;
}

export async function withAuthAndVerify(request: NextRequest) {
    const userToken = await withAuth(request);
    return verifyToken(userToken) as UserToken;
}
