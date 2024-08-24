export interface CommentCreatorModel{
    commentId: string
    creatorUid: string
    ownerUid: string
    replyIds: string[]
    date: Date
    detail: string
} 