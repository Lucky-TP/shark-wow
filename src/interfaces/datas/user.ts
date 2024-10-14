import { UserModel } from "../models/user";
import { CreatorProjectStats, TimeSeriesDataPoint } from "./common";
import { ExtendProjectPreview, ProjectPreview, ProjectSummary, ShowProject } from "./project";

export type UserData = UserModel;

export interface PopularCreator {
    uid: string;
    firstName: string;
    lastName: string;
    profileImageUrl?: string;
    email: string;
    totalProjectSuccess: number;
    totalSupporter: number;
}

export type PublicUserData = Omit<
    UserModel,
    | "email"
    | "favoriteProjectIds"
    | "interestCategories"
    | "birthDate"
    | "agreement"
    | "ownProjectIds"
    | "accountBank"
    | "accountNumber"
> & {
    projectSummarizes: ShowProject[];
    birthDate: string;
};

export interface UserPreview {
    uid: string;
    username: string;
    profileImageUrl: string;
}

export interface DonatorPreview extends UserPreview {
    totalDonates: number;
}

export interface UserActivity {
    userPreview: UserPreview;
    amount: number;
    date: string;
    action: "donate" | "funding";
}

export interface CreatorSummaryStats {
    timeSeriesData(timeSeriesData: any): unknown;
    topDonators: DonatorPreview[];
    topSupportedProjects: ProjectPreview[];
    projectStats: CreatorProjectStats;
    financialTimeSeries: TimeSeriesDataPoint[];
    recentContributions: UserActivity[];
    totalSupporter: number;
    totalFunding: number;
}

export interface CreatorOwnProjects {
    drafted: ProjectPreview[];
    launched: ProjectSummary[];
    failed: ProjectSummary[];
    completed: ProjectSummary[];
}

export interface SupporterSummaryProjects {
    favorited: ExtendProjectPreview[];
    contributed: ExtendProjectPreview[];
}
