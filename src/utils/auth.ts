import { CollectionPath } from "src/constants/collection";
import { addNewUser } from "src/databases/firestore/userDoc";
import { UserModel } from "src/interfaces/models/user";
import { getDoc } from "src/databases/firestore/utils";
import { DecodedIdToken } from "firebase-admin/auth";
import { dateToTimestamp } from "./dateFormat";

export async function findOrCreateUser(
    tokenData: DecodedIdToken
): Promise<UserModel> {
    const { uid, name, email, picture } = tokenData;
    const userDoc = getDoc(CollectionPath.USER, uid);
    const userSnapshot = await userDoc.get();

    if (!userSnapshot.exists) {
        const newUser: UserModel = {
            uid,
            username: name,
            firstName: "",
            lastName: "",
            aboutMe: "",
            email: email || "",
            profileImageUrl: picture || "",
            ownProjectIds: [],
            favoriteProjectIds: [],
            popularDetail: {
                totalProjectSuccess: 0,
                totalSupporter: 0,
            },
            birthDate: dateToTimestamp(new Date()),
            receivedComments: [],
            interestCategories: [],
            address: {
                country: "",
                city: "",
                province: "",
                postalCode: "",
            },
            contact: {
                facebook: "",
                X: "",
                youtube: "",
                phone: "",
            },
            cvUrl: "",
            agreement: false,
        };

        await addNewUser(newUser);
        return newUser;
    }

    return userSnapshot.data() as UserModel;
}
