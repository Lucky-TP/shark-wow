"use server";
import nodemailer from "nodemailer";

interface SendEmailProps {
    to: string;
    subject: string;
    text: string;
    html: string;
}

export async function sendEmail({ to, subject, text, html }: SendEmailProps) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error: unknown) {
        console.error("Error sending email:", error);
        throw error;
    }
}
