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
