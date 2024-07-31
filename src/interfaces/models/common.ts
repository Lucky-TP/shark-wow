export interface ReceivedComment {
    commentId: number;
    uid: number;
    detail: string;
    date: Date;
}

export interface PopularCreator{
    firstName: string;
    lastName: string;
    profileImageUrl?: string;
    email: string;
    totalProjectSuccess: number;
    totalSupporter: number;
}