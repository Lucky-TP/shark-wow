export class CustomError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.name = "CustomError";
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
