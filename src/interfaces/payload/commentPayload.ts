export interface CreateCommentPayload {
    detail: string;
}

export interface EditCommentPayload {
    detail: string;
}

export interface DeleteCommentPayload {
    type: string,
    id: string
}