import { NextRequest , NextResponse } from "next/server";
import { UserRole } from "src/interfaces/models/enums";
import { withAuthVerify } from "src/utils/api/auth";
import { StatusCode } from "src/constants/statusCode";
import { updateProject } from "src/libs/databases/firestore/projects";
import { ProjectStatus } from "src/interfaces/models/enums";
import { errorHandler } from "src/libs/errors/apiError";
import { sendEmail } from "src/libs/notifications";
import { getTransactionLogsByProjectIds } from "src/libs/databases/firestore/transactionLogs";

const SUBJECT = "Request for Next Stage Funding";
const TEXT = `Dear User,

    We are thrilled to inform you that you have successfully advanced to the next stage of our selection process. 

    Please check your account for further instructions.

    Best regards,
    The Team`;
const html = '';


export async function PATCH(request : NextRequest , { params }: { params: { projectId: string }}) {
    try{
        const tokenData = await withAuthVerify(request);
        const userRole = tokenData.role;
        if(userRole !== UserRole.ADMIN){
            return NextResponse.json(
                { message: "You have no permission." },
                { status: StatusCode.BAD_REQUEST }
            );
        }
        const projectId = params.projectId;
        const promiseUpdateProject =updateProject(projectId, {
            status: ProjectStatus.RUNNING
        });

        const transactions = await getTransactionLogsByProjectIds([projectId]);
        const setOfEmail = new Set<string>();
        transactions.forEach((transaction) => {
            setOfEmail.add(transaction.email)
        });

        await promiseUpdateProject; 

        await Promise.allSettled(Array.from(setOfEmail).map((email) => {
            return sendEmail({ to: email, subject: SUBJECT, text: TEXT, html: html });
        }));

        return NextResponse.json(
            { message: "Approve project successful." },
            { status: StatusCode.SUCCESS }
        );
    }
    catch(error: any){
        return errorHandler(error);
    }
}