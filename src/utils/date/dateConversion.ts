import dayjs from "dayjs";

/**
 * Converts a Dayjs object to a string in ISO format.
 * @param date - The Dayjs object.
 * @returns The date as a string in ISO format.
 */
export function dayjsToString(date: dayjs.Dayjs): string {
    return date.toISOString();
}

/**
 * Converts a string in ISO format to a Dayjs object.
 * @param dateString - The date string in ISO format.
 * @returns The corresponding Dayjs object.
 */
export function stringToDayjs(dateString: string): dayjs.Dayjs {
    return dayjs(dateString);
}

/**
 * Converts a JavaScript Date object to a string in ISO format.
 * @param date - The Date object.
 * @returns The date as a string in ISO format.
 */
export function dateToString(date: Date): string {
    return date.toISOString();
}

/**
 * Converts a string in ISO format to a JavaScript Date object.
 * @param dateString - The date string in ISO format.
 * @returns The corresponding Date object.
 */
export function stringToDate(dateString: string): Date {
    return new Date(dateString);
}
