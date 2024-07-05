import { NextRequest, NextResponse } from "next/server";
import { prismaDb } from "src/libs/prismaDB";

export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();
        const { fname, lname, email } = payload;
        const newUser = await prismaDb.user.create({
            data: { fname, lname, email },
        });
        return NextResponse.json({
            message: "User create successful",
            data: newUser,
        });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json(
            { message: "Failed to create user", error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const allUser = await prismaDb.user.findMany();
        console.log(allUser);
        return NextResponse.json({
            message: "User get successful",
            data: allUser,
        });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json(
            { message: "Failed to get user", error: error.message },
            { status: 500 }
        );
    }
}
