import { UserModel } from "src/interfaces/models/user";
import { getDocRef, runTransaction } from "../firestore";
import { CollectionPath } from "src/constants/firestore";
import { CustomError } from "src/libs/errors/apiError";
import { StatusCode } from "src/constants/statusCode";

export async function updateUser(uid: string, newUserData: Partial<UserModel>): Promise<void> {
    await runTransaction(async (transaction) => {
        const userDocRef = getDocRef(CollectionPath.USER, uid);
        const userSnapshot = await transaction.get(userDocRef);
        if (!userSnapshot.exists) {
            throw new CustomError("User does not exist", StatusCode.NOT_FOUND);
        }
        const currentUserData = userSnapshot.data() as UserModel;
        transaction.update(userDocRef, {
            username: newUserData.username || currentUserData.username,
            firstName: newUserData.firstName || currentUserData.firstName,
            lastName: newUserData.lastName || currentUserData.lastName,
            aboutMe: newUserData.aboutMe || currentUserData.aboutMe,
            profileImageUrl: newUserData.profileImageUrl || currentUserData.profileImageUrl,
            birthDate: newUserData.birthDate || currentUserData.birthDate,
            ownProjectIds: newUserData.ownProjectIds || currentUserData.ownProjectIds,
            favoriteProjectIds:
                newUserData.favoriteProjectIds || currentUserData.favoriteProjectIds,
            popularDetail: newUserData.popularDetail || currentUserData.popularDetail,
            receivedCommentIds:
                newUserData.receivedCommentIds || currentUserData.receivedCommentIds,
            interestCategories:
                newUserData.interestCategories || currentUserData.interestCategories,
            address: newUserData.address || currentUserData.address,
            contact: newUserData.contact || currentUserData.contact,
            cvUrl: newUserData.cvUrl || currentUserData.cvUrl,
            agreement: newUserData.agreement || currentUserData.agreement,
        });
    });
}