import { ProjectModel } from "../models/project";
import { UserModel } from "../models/user";
import { CommentData } from "./comment";

export type UserData = Omit<UserModel, "ownProjectIds" | "receivedCommentIds"> & {
    ownProjects: ProjectModel[];
    receivedComments: CommentData[];
};

export interface PopularCreator {
    uid: string;
    firstName: string;
    lastName: string;
    profileImageUrl?: string;
    email: string;
    totalProjectSuccess: number;
    totalSupporter: number;
}
