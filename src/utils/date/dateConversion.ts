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

/**
 * Converts a string in ISO format to a JavaScript Date object adjusted to UTC+7
 * and returns the formatted string in ISO format with the +07:00 offset.
 * @param dateString - The date string in ISO format (e.g., '2024-09-10T11:54:59.210Z').
 * @returns An object containing the Date object and the formatted string.
 */
export function convertToUTCPlus7(dateString: string): { date: Date; isoString: string } {
    const utcDate = new Date(dateString);
    // Add 7 hours in milliseconds
    const utcPlus7Date = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);

    // Format the date as an ISO string with UTC+7 offset
    const isoString = utcPlus7Date.toISOString().replace("Z", "+07:00");

    return { date: utcPlus7Date, isoString };
}
