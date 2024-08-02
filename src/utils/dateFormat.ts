import { Timestamp } from "firebase-admin/firestore";

/**
 * Translates a duration string (e.g., '1d', '1h', '30m', '45s') to seconds.
 * @param duration - The duration string to translate.
 * @returns The equivalent duration in seconds.
 */
export function translateDurationToSeconds(duration: string): number {
    const timeUnits: { [key: string]: number } = {
        d: 86400, // 1 day = 86400 seconds
        h: 3600, // 1 hour = 3600 seconds
        m: 60, // 1 minute = 60 seconds
        s: 1, // 1 second = 1 second
    };

    const regex = /(\d+)([dhms])/g;
    let match;
    let totalSeconds = 0;

    while ((match = regex.exec(duration)) !== null) {
        const value = parseInt(match[1], 10);
        const unit = match[2];

        if (timeUnits[unit] !== undefined) {
            totalSeconds += value * timeUnits[unit];
        }
    }

    return totalSeconds;
}

// export function dateGmt0ToDateGmt7(date: Date): Date {
//     const gmt7MilliSecond = translateDurationToSeconds("7h") * 1000;
//     const gmt7Date = new Date(date.getTime() + gmt7MilliSecond);
//     return gmt7Date;
// }

export function milliToTimestamp(milliSecond: number): Timestamp {
    return Timestamp.fromMillis(milliSecond);
}

export function dateToTimestamp(date: Date): Timestamp {
    return Timestamp.fromDate(date);
}

// export function newTimestampGmt7(): Timestamp {
//     return dateToTimestamp(dateGmt0ToDateGmt7(new Date()));
// }

export function timestampToDate(timestamp: Timestamp): Date {
    return new Date(timestamp.toDate());
}
