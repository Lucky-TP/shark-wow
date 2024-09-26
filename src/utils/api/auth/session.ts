"use server";

import { cookies } from "next/headers";
import { DecodedIdToken } from "firebase-admin/auth";
import { generateJWT } from "./jose";
import { translateDurationToSeconds } from "../../date/translateDurationToSeconds";
import { UserToken } from "src/interfaces/token";
import { USER_TOKEN } from "src/constants/cookiesKeyName";
import { UserRole } from "src/interfaces/models/enums";

interface SignUserSessionParams {
    uid: string;
    role: UserRole;
}

export async function signUserSession({ uid, role }: SignUserSessionParams) {
    const tokenData: UserToken = { uid, role };
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
