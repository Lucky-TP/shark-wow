import { getDocRef, runTransaction } from "../commons";
import { UserModel } from "src/interfaces/models/user";
import { CollectionPath } from "src/constants/firestore";
import { StatusCode } from "src/constants/statusCode";
import { CustomError } from "src/libs/errors/apiError";

export async function updateUser(uid: string, newUserData: Partial<UserModel>): Promise<void> {
    try {
        await runTransaction(async (transaction) => {
            const userDocRef = getDocRef(CollectionPath.USER, uid);
            const userSnapshot = await transaction.get(userDocRef);
            if (!userSnapshot.exists) {
                throw new CustomError("User does not exist", StatusCode.NOT_FOUND);
            }
            const currentUserData = userSnapshot.data() as UserModel;
            const updateData: Partial<UserModel> = {
                username: newUserData.username ?? currentUserData.username ?? "",
                firstName: newUserData.firstName ?? currentUserData.firstName ?? "",
                lastName: newUserData.lastName ?? currentUserData.lastName ?? "",
                aboutMe: newUserData.aboutMe ?? currentUserData.aboutMe ?? "",
                profileImageUrl: newUserData.profileImageUrl ?? currentUserData.profileImageUrl ?? "",
                birthDate: newUserData.birthDate ?? currentUserData.birthDate ?? "",
                ownProjectIds: newUserData.ownProjectIds ?? currentUserData.ownProjectIds ?? "",
                favoriteProjectIds:
                    newUserData.favoriteProjectIds ?? currentUserData.favoriteProjectIds ?? "",
                popularDetail: newUserData.popularDetail ?? currentUserData.popularDetail ?? "",
                receivedCommentIds:
                    newUserData.receivedCommentIds ?? currentUserData.receivedCommentIds ?? "",
                interestCategories:
                    newUserData.interestCategories ?? currentUserData.interestCategories ?? "",
                address: newUserData.address ?? currentUserData.address ?? "",
                contact: newUserData.contact ?? currentUserData.contact ?? "",
                cvUrl: newUserData.cvUrl ?? currentUserData.cvUrl ?? "",
                agreement: newUserData.agreement ?? currentUserData.agreement ?? "",
                accountBank: newUserData.accountBank ?? currentUserData.accountBank ?? "",
                accountNumber: newUserData.accountNumber ?? currentUserData.accountNumber ?? "",
                accountHolderName:
                    newUserData.accountHolderName ?? currentUserData.accountHolderName ?? "",
            };
            transaction.update(userDocRef, updateData);
        });
    } catch (error: unknown) {
        throw new CustomError("Update user failed", StatusCode.INTERNAL_SERVER_ERROR);
    }
}
