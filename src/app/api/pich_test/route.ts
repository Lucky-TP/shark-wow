import { NextRequest, NextResponse } from "next/server";

let dataStore: any[] = [];

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        dataStore.push(body);
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
