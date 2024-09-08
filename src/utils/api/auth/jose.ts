"use server";

import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { importPKCS8, importSPKI, KeyLike } from "jose";
import { UserToken } from "src/interfaces/token";

interface JWTUserTokenPayload extends JWTPayload {
    payload: UserToken;
}

export async function generateJWT(payload: object): Promise<string> {
    const privateKey = await importPKCS8(process.env.JWT_PRIVATE_KEY!, "RS256");
    const jwt = new SignJWT({ payload })
        .setProtectedHeader({ alg: "RS256" })
        .setExpirationTime("1d");
    const token = await jwt.sign(privateKey);
    return token;
}

export async function verifyJWT(token: string): Promise<UserToken | null> {
    try {
        const publicKey = await importSPKI(process.env.JWT_PUBLIC_KEY!, "RS256");
        const { payload }: { payload: JWTUserTokenPayload } = await jwtVerify(token, publicKey);
        const { payload: userToken } = payload;
        return userToken;
    } catch (error: unknown) {
        if (error) console.log(error);
        return null;
    }
}
