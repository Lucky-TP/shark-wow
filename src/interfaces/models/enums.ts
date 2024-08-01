export enum TransactionType {
    DONATE = 0,
    FUNDING = 1,
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
    UNDEFINE = 3
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
