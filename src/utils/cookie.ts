import { cookies } from "next/headers";
import { DecodedIdToken } from "firebase-admin/auth";
import { signToken } from "./jwt";
import { translateDurationToSeconds } from "./dateFormat";
import { UserToken } from "src/interfaces/token";
import { USER_TOKEN } from "src/constants/cookiesKeyName";

export function signUserSession(decodedToken: DecodedIdToken) {
    const tokenData: UserToken = { uid: decodedToken.uid };
    const token = signToken(tokenData);
    const cookieStore = cookies();
    cookieStore.set(USER_TOKEN, token, {
        maxAge: translateDurationToSeconds("1d"),
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
    });
}

export function clearUserSession() {
    const cookieStore = cookies();
    cookieStore.getAll().forEach(({ name }) => cookieStore.delete(name));
}
