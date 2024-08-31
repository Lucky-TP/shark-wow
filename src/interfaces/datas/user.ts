import { ProjectModel } from "../models/project";
import { UserModel } from "../models/user";
import { CommentData } from "./comment";

export type UserData = Omit<UserModel, "ownProjectIds" | "receivedCommentIds"> & {
    ownProjects: ProjectModel[];
    receivedComments: CommentData[];
};
