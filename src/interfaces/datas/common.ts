export interface CreatorProjectStats {
    launched: number;
    drafted: number;
    completed: number;
    failed: number;
}

export interface TimeSeriesDataPoint {
    date: string;
    totalAmount: number;
    transactionCount: number;
}

