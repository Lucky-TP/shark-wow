import { NextRequest, NextResponse } from "next/server";
import { db } from "src/db/firebaseAdmin";

interface UserType {
    name: string;
    email: string;
    role: string;
}

export async function GET() {
    try {
        const snapshot = await db.collection("users").get();
        const users: UserType[] = snapshot.docs.map(
            (doc) => doc.data() as UserType
        );
        console.log(users);
        return NextResponse.json({
            message: "Data retrieved successfully",
            data: users,
        });
    } catch (error: any) {
        console.error("Error handling POST request:", error);
        return NextResponse.json(
            { message: "Failed to add data", error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body: UserType = await request.json();
        // const { name, email, role } = body;
        const docRef = db.collection("users").doc();
        await docRef.set({
            name: body.name,
            email: body.email,
            role: body.role,
        });
        return NextResponse.json({
            message: "Data added successfully",
            data: body,
        });
    } catch (error: any) {
        console.error("Error handling POST request:", error);
        return NextResponse.json(
            { message: "Failed to add data", error: error.message },
            { status: 500 }
        );
    }
}
