import { CommentModel } from "./comment";
import { ProjectModel } from "./project";
import { ReplyModel } from "./reply";
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

export type CommentData = Omit<CommentModel, "replyIds"> & {
    replys: ReplyModel[];
};

export type UserData = Omit<UserModel, "ownProjectIds" | "receivedCommentIds"> & {
    ownProjects: ProjectModel[];
    receivedComments: CommentData[];
};
