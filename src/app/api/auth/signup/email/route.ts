import { NextRequest, NextResponse } from "next/server";
import { DecodedIdToken } from "firebase-admin/auth";
import { auth } from "src/libs/firebase/firebaseAdmin";
import { createUser, deleteUser, getUser } from "src/libs/databases/firestore/users";
import { StatusCode } from "src/constants/statusCode";
import { UserModel } from "src/interfaces/models/user";
import { EmailSignUpPayload } from "src/interfaces/payload/authPayload";
import { extractBearerToken, signUserSession } from "src/utils/api/auth";
import { CustomError, errorHandler } from "src/libs/errors/apiError";

/**
 * @swagger
 * /api/auth/signup/email:
 *   post:
 *     tags:
 *       - auth
 *     description: Sign up a new user using email. Requires a Bearer token in the Authorization header.
 *     security:
 *       - BearerAuth: []  # Requires Bearer token authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: User's first name
 *               lastName:
 *                 type: string
 *                 description: User's last name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 description: User's birth date
 *               address:
 *                 type: object
 *                 properties:
 *                   country:
 *                     type: string
 *                     description: Country
 *                   city:
 *                     type: string
 *                     description: City
 *                   province:
 *                     type: string
 *                     description: Province or state
 *                   postalCode:
 *                     type: string
 *                     description: Postal code
 *                 required:
 *                   - country
 *                   - city
 *                   - province
 *                   - postalCode
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - birthDate
 *               - address
 *     responses:
 *       200:
 *         description: User signed up successfully
 *       500:
 *         description: Internal server error - Something went wrong
 */

export async function POST(request: NextRequest) {
    let decodedToken: DecodedIdToken | null = null;
    try {
        const userIdToken = extractBearerToken(request);
        const body: EmailSignUpPayload = await request.json();
        decodedToken = await auth.verifyIdToken(userIdToken);

        const userModel: Partial<UserModel> = {
            uid: decodedToken.uid,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            birthDate: body.birthDate,
            address: [body.address],
        };

        await createUser(userModel);
        const retrivedUserModel = await getUser(decodedToken.uid);
        await signUserSession({
            uid: retrivedUserModel.uid,
            email: retrivedUserModel.email,
            role: retrivedUserModel.role,
        });

        return NextResponse.json({ message: "Sign-in successful" }, { status: StatusCode.SUCCESS });
    } catch (error: unknown) {
        if (error instanceof Error || error instanceof CustomError) {
            if (decodedToken) {
                await auth.deleteUser(decodedToken.uid);
                await deleteUser(decodedToken.uid);
            }
        }
        return errorHandler(error);
    }
}
