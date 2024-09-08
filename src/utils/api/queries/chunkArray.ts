import { StatusCode } from "src/constants/statusCode";
import { CustomError } from "src/libs/errors/apiError";

export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
    if (chunkSize > 30) {
        throw new CustomError(
            "Chunk size should not more than 30",
            StatusCode.BAD_REQUEST
        );
    }
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, chunkSize + i));
    }
    return result;
}
