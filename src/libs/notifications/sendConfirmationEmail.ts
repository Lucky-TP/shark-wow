"use server";
import { sendEmail } from "./sendEmail";

interface SendConfirmationEmailProps {
    recipientEmail: string;
    projectName: string;
    stageName: string;
    slipUrl: string;
}

export async function sendConfirmationEmail({
    recipientEmail,
    projectName,
    stageName,
    slipUrl,
}: SendConfirmationEmailProps) {
    const subject = `Thank You for Supporting "${projectName}"!`;
    const text = `Thank you for supporting the "${projectName}" project at the "${stageName}" stage! Visit your slip here: ${slipUrl}`;
    const html = `
        <html>
        <head>
                <style>
                    a {
                        color: #007bff; 
                        text-decoration: none; 
                    }
                    a:hover {
                        text-decoration: underline; 
                    }
                </style>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.5;">
                <h1 style="color: #333;">Thank You!</h1>
                <p>Dear Supporter,</p>
                <p>Thank you for supporting the project <strong>"${projectName}"</strong> at the <strong>"${stageName}"</strong> stage! Your contribution means a lot to us.</p>
                <p>You can view your slip by clicking the link below:</p>
                <p>
                    <a href="${slipUrl}" style="color: #007bff; text-decoration: none;">View Your Slip</a>
                </p>
                <p>We appreciate your support!</p>
                <p>Best Regards</p>
            </body>
        </html>
    `;

    try {
        const info = await sendEmail({ to: recipientEmail, subject, text, html });
        console.log("Email sent successfully:", info);
    } catch (error) {
        console.error("Failed to send email:", error);
    }
}
