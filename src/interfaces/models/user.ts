import { Address } from "./common";
import { UserRole } from "./enums";

export interface PopularDetail {
    totalProjectSuccess: number;
    totalSupporter: number;
}

export interface Contact {
    facebook: string;
    X: string;
    youtube: string;
    phone: string;
}

export interface UserModel {
    uid: string; // pk
    username: string;
    firstName: string;
    lastName: string;
    aboutMe: string;
    role: UserRole;
    email: string;
    profileImageUrl?: string;
    ownProjectIds: string[];
    favoriteProjectIds: string[];
    popularDetail: PopularDetail;
    receivedCommentIds: string[];
    interestCategories: string[];
    birthDate: string;
    address: Address[];
    contact: Contact;
    cvUrl: string;
    agreement: boolean;
    accountBank: string;
    accountHolderName: string;
    accountNumber: string;
}
