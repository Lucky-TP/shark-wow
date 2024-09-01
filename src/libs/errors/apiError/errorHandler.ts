import { NextResponse } from "next/server";
import { CustomError } from "./customError";

export function errorHandler(err: unknown) {
    console.log(err);
    if (err instanceof CustomError) {
        return NextResponse.json(
            { message: err.message },
            { status: err.status }
        );
    }
    return NextResponse.json({ message: "Request failed" }, { status: 500 });
}
