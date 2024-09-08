export enum TransactionType {
    DONATE = 'donate',
    FUNDING = 'funding',
}

export enum ProjectStatus {
    DRAFT = 0,
    RUNNING = 1,
    SUCCESS = 2,
    FAIL = 3,
}

export enum StageId {
    CONCEPT = 0,
    PROTOTYPE = 1,
    PRODUCTION = 2,
    UNDEFINE = 3,
}

export enum StageStatus {
    NOT_USE = 0,
    INCOMING = 1,
    CURRENT = 2,
    FINISH = 3,
}

export enum MetadataId {
    USER = 0,
    PROJECT = 1,
    TRANSACTION = 2,
    COMMENT = 3,
}

export enum OrderStatus {
    PENDING = "pending", // Order has been created but payment hasn't started yet.
    PROCESSING = "processing", // Payment is being processed.
    COMPLETED = "completed", // Payment is successful and order is complete.
    CANCELED = "canceled", // Order was canceled either by the user or due to failed payment.
    FAILED = "failed", // Payment failed due to issues (e.g., insufficient funds, declined card).
    REFUNDED = "refunded", // Payment was refunded after successful completion.
    EXPIRED = "expired", // Payment session expired without completing the order.
}
