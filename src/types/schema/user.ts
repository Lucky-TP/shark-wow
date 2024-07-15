interface SupportProject {
    projectId: number;
    optionId: number;
    stage: number;
    funding: number;
}

export interface UserData {
    username: string;
    profileImageUrl?: string;
    currentProjectIds: number[];
    historicalProjectIds: number[];
    favoriteProjectIds: number[];
    supportProjects: SupportProject[];
    agreement: boolean;
}
