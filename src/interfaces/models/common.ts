import { UserModel } from "./user";

interface Stage {
    minimumFunding: number;
    currentFunding: number;
    goalFunding: number;
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
    projectId: string;
    name: string;
    carouselImageUrls: string[];
    description: string;
    stages: Stage[];
    category: string;
}

export interface Address {
    country: string;
    city: string;
    province: string;
    postalCode: string;
}

export interface CommentReply {
    replyId: string
    repliedToUid: string
    ownerUid: string
    date: Date
    detail: string
}

export interface CommentProject {
    commentId: string
    projectId: string
    uid: string
    replys: CommentReply[] 
    date: Date
    detail: string
}

export interface CommentCreator {
    commentId: string
    creatorUid: string
    ownerUid: string
    replys: CommentReply[]
    date: Date
    detail: string
}

export type UserDataWithDate = Omit<UserModel, "birthDate"> & {
    birthDate: Date;
};