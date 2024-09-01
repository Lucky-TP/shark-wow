import { Timestamp } from "firebase-admin/firestore";

/**
 * Converts milliseconds to a Firestore Timestamp.
 * @param milliSecond - The number of milliseconds.
 * @returns The Firestore Timestamp.
 */
export function milliToTimestamp(milliSecond: number): Timestamp {
    return Timestamp.fromMillis(milliSecond);
}

/**
 * Converts a JavaScript Date object to a Firestore Timestamp.
 * @param date - The Date object.
 * @returns The Firestore Timestamp.
 */
export function dateToTimestamp(date: Date): Timestamp {
    return Timestamp.fromDate(date);
}

/**
 * Converts a Firestore Timestamp to a JavaScript Date object.
 * @param timestamp - The Firestore Timestamp.
 * @returns The Date object.
 */
export function timestampToDate(timestamp: Timestamp): Date {
    return new Date(timestamp.toDate());
}
