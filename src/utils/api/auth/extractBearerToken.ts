import { NextRequest } from "next/server";

export function extractBearerToken(request: NextRequest) {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
        throw new Error("Authorization header missing");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        throw new Error("Token missing");
    }
    return token;
}
