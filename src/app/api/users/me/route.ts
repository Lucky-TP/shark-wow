import { NextRequest, NextResponse } from "next/server";
import { StatusCode } from "src/constants/statusCode";
import { getUser } from "src/libs/databases/firestore/users";
import { errorHandler } from "src/libs/errors/apiError";
import { withAuthVerify } from "src/utils/api/auth";
import { EditUserPayload } from "src/interfaces/payload/userPayload";
import { updateUser } from "src/libs/databases/firestore/users/updateUser";

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     tags:
 *       - users
 *     description: Return the authenticated user's self data
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Fetch user self data successful!
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *
 *   put:
 *     tags:
 *       - users
 *     description: Update the authenticated user's self data
 *     security:
 *       - CookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The user's first name
 *               lastName:
 *                 type: string
 *                 description: The user's last name
 *               aboutMe:
 *                 type: string
 *                 description: Information about the user
 *               address:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     country:
 *                       type: string
 *                       description: The country of the address
 *                     city:
 *                       type: string
 *                       description: The city of the address
 *                     province:
 *                       type: string
 *                       description: The province or state of the address
 *                     postalCode:
 *                       type: string
 *                       description: The postal code of the address
 *               contact:
 *                 type: object
 *                 properties:
 *                   facebook:
 *                     type: string
 *                     description: The user's Facebook profile link
 *                   X:
 *                     type: string
 *                     description: The user's X (formerly Twitter) profile link
 *                   youtube:
 *                     type: string
 *                     description: The user's YouTube channel link
 *                   phone:
 *                     type: string
 *                     description: The user's phone number
 *               profileImageUrl:
 *                 type: string
 *                 description: The URL of the user's profile image
 *               cvUrl:
 *                 type: string
 *                 description: The URL of the user's CV or resume
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized - Missing or invalid token
 */

export const revalidate = 15;

export async function GET(request: NextRequest) {
    try {
        console.log("GET request received for user data.");

        const tokenData = await withAuthVerify(request);
        console.log(`Token verified for user ID: ${tokenData.uid}`);

        const retrievedUser = await getUser(tokenData.uid);
        console.log("User data retrieved successfully", {
            uid: tokenData.uid,
            userData: retrievedUser,
        });

        return NextResponse.json(
            { message: "Retrieved user successfully", data: retrievedUser },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        console.error("Error retrieving user data", error);
        return errorHandler(error);
    }
}

export async function PUT(request: NextRequest) {
    try {
        console.log("PUT request received to update user data.");

        const tokenData = await withAuthVerify(request);
        console.log(`Token verified for user ID: ${tokenData.uid}`);

        const uid = tokenData.uid;
        const body: Partial<EditUserPayload> = await request.json();
        console.log("User update data received", body);

        await updateUser(uid, body);
        console.log("User data updated successfully", { uid });

        return NextResponse.json(
            { message: "Update user successful" },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        console.error("Error updating user data", error);
        return errorHandler(error);
    }
}
