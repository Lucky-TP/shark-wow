import { ReceivedComment } from "./common";

interface PopularDetail {
    totalProjectSuccess: number;
    totalSupporter: number;
}

interface Address {
    country: string;
    city: string;
    province: string;
    postalCode: string;
}

interface Contact {
    facebook: string;
    X: string;
    youtube: string;
    phone: string;
}

export interface UserModel {
    uid: number; // pk
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
    address: Address;
    contact: Contact;
    cvUrl: string;
    agreement: boolean;
}
