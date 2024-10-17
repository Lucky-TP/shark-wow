"use server";

import { cookies } from "next/headers";
import { generateJWT } from "./jose";
import { translateDurationToSeconds } from "../../date/translateDurationToSeconds";
import { UserToken } from "src/interfaces/token";
import { USER_TOKEN } from "src/constants/cookiesKeyName";
import { UserRole } from "src/interfaces/models/enums";

interface SignUserSessionParams {
    uid: string;
    email: string;
    role: UserRole;
}

export async function signUserSession({ uid, email, role }: SignUserSessionParams) {
    const tokenData: UserToken = { uid, email, role };
    const token = await generateJWT(tokenData);
    const cookieStore = cookies();
    cookieStore.set(USER_TOKEN, token, {
        maxAge: translateDurationToSeconds("1d"),
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
    });
}

export async function clearUserSession() {
    const cookieStore = cookies();
    cookieStore.getAll().forEach(({ name }) => cookieStore.delete(name));
}
