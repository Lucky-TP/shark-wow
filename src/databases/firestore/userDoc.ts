import { getDoc } from "./utils";
import { StatusCode } from "src/constants/statusCode";
import { CollectionPath } from "src/constants/collection";
import { UserModel } from "src/interfaces/models/user";
import { CustomError } from "src/utils/errors/customError";
import { dateToTimestamp } from "src/utils/dateFormat";

const USER_COLLECTION = CollectionPath.USER;

export async function addNewUser(userData: UserModel) {
    try {
        const userDoc = getDoc(USER_COLLECTION, userData.uid);
        const userSnapshot = await userDoc.get();

        if (userSnapshot.exists) {
            throw new CustomError("User exists", StatusCode.ALREADY_EXISTS);
        }

        await userDoc.set(userData);
    } catch (error: any) {
        throw error;
    }
}

export async function createUser(
    userData?: Partial<UserModel>
): Promise<UserModel> {
    const uid = userData?.uid;
    if (!uid) {
        throw new CustomError("Uid not given", StatusCode.BAD_REQUEST);
    }

    const newUser: UserModel = {
        uid,
        username: userData?.username || "",
        firstName: userData?.firstName || "",
        lastName: userData?.lastName || "",
        aboutMe: userData?.aboutMe || "",
        email: userData?.email || "",
        profileImageUrl: userData?.profileImageUrl || "",
        birthDate: userData?.birthDate || dateToTimestamp(new Date()),
        ownProjectIds: [],
        favoriteProjectIds: [],
        popularDetail: {
            totalProjectSuccess: 0,
            totalSupporter: 0,
        },
        receivedComments: [],
        interestCategories: [],
        address: userData?.address || [],
        contact: userData.contact || {
            facebook: "",
            X: "",
            youtube: "",
            phone: "",
        },
        cvUrl: "",
        agreement: userData?.agreement || false,
    };

    await addNewUser(newUser);
    return newUser;
}

export async function getUser(uid: string) {
    try {
        const userDoc = getDoc(USER_COLLECTION, uid);
        const userSnapshot = await userDoc.get();

        if (!userSnapshot.exists) {
            throw new CustomError("User not exists", StatusCode.NOT_FOUND);
        }

        return userSnapshot.data() as UserModel;
    } catch (error: any) {
        throw error;
    }
}
