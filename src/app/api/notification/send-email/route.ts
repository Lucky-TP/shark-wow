// app/api/send-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { StatusCode } from "src/constants/statusCode";
import { errorHandler } from "src/libs/errors/apiError";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { to, subject, text } = body;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email options
        const mailOptions = {
            from: "sharkwow.cpe36@gmail.com",
            to,
            subject,
            text,
            // html,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log(info);
        return NextResponse.json({ message: "Email sent" }, { status: StatusCode.SUCCESS });
    } catch (error) {
        return errorHandler(error);
    }
}
