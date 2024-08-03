import { UserModel } from "./user";

interface Stage{
    currentFunding: number;
    goalFunding: number;
}

export interface ReceivedComment {
    commentId: number;
    uid: number;
    detail: string;
    date: Date;
}

export interface PopularCreator {
    firstName: string;
    lastName: string;
    profileImageUrl?: string;
    email: string;
    totalProjectSuccess: number;
    totalSupporter: number;
}

export interface ShowProject {
    projectId: number;
    name: string;
    images: string[];
    description: string;
    stages: Stage[];
}

export interface Address {
    country: string;
    city: string;
    province: string;
    postalCode: string;
}

export type UserDataWithDate = Omit<UserModel, "birthDate"> & {
    birthDate: Date;
};
