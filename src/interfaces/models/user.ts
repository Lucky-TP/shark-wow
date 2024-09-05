import { Timestamp } from "firebase-admin/firestore";
import { Address } from "./common";

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
    email: string;
    profileImageUrl?: string;
    ownProjectIds: string[];
    favoriteProjectIds: string[];
    popularDetail: PopularDetail;
    receivedCommentIds: string[];
    interestCategories: string[];
    birthDate: Timestamp ;
    address: Address[];
    contact: Contact;
    cvUrl: string;
    agreement: boolean;
}
