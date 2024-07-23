export enum TransactionType {
    DONATE = "donate",
    FUNDING = "funding",
}

export enum ProjectStatus {
    DRAFT = 0,
    PENDING = 1,
    APPROVED = 2,
    LAUNCH = 3,
    END = 4,
}

export enum BlogType {
    TEXT = 0,
    TEXT_BOLD = 1,
    IMAGE = 2,
}

export interface ReceivedComment {
    commentId: number;
    uid: string;
    message: string;
}

export interface Blog {
    id: number;
    content: string;
    type: BlogType;
}
