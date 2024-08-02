import { Timestamp } from "firebase-admin/firestore";

const GMT_7_MILLISEC = 7 * 60 * 60 * 1000;

export function dateGmt0ToDateGmt7(date: Date): Date {
    const gmt7Date = new Date(date.getTime() + GMT_7_MILLISEC);
    return gmt7Date;
}

export function dateToTimestamp(date: Date): Timestamp {
    const timestamp = Timestamp.fromDate(date);
    return timestamp;
}

export function newTimestampGmt7(): Timestamp {
    return dateToTimestamp(dateGmt0ToDateGmt7(new Date()));
}

export function timestampToDate(timestamp: Timestamp): Date {
    const date = new Date(timestamp.toDate());
    return date;
}
