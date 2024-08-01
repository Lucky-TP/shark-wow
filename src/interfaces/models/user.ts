import { Timestamp } from "firebase-admin/firestore";
import { ReceivedComment } from "./common";

export interface PopularDetail {
    totalProjectSuccess: number;
    totalSupporter: number;
}

export interface Address {
    country: string;
    city: string;
    province: string;
    postalCode: string;
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
    password?: string;
    firstName: string;
    lastName: string;
    aboutMe: string;
    email: string;
    profileImageUrl?: string;
    ownProjectIds: number[];
    favoriteProjectIds: number[];
    popularDetail: PopularDetail;
    receivedComments: ReceivedComment[];
    interestCategories: string[];
    birthDate: Timestamp;
    address: Address;
    contact: Contact;
    cvUrl: string;
    agreement: boolean;
}
