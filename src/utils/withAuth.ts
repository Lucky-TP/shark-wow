"use server";
import { NextRequest } from "next/server";
import { USER_TOKEN } from "src/constants/cookiesKeyName";

export async function withAuth(request: NextRequest) {
    const userToken = request.cookies.get(USER_TOKEN);
    if (!userToken) {
        throw new Error("Unauthorized");
    }
    return userToken;
}
