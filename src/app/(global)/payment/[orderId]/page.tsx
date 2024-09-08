"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingPage from "src/components/global/LoadingPage";
import { StatusCode } from "src/constants/statusCode";
import { pollingPayment } from "src/services/apiService/payments/pollingPayment";

export default function PaymentCheckingPage({ params }: { params: { orderId: string } }) {
    const [loading, setLoading] = useState<boolean>(true);
    const [slipUrl, setSlipUrl] = useState<string | null>(null);

    useEffect(() => {
        const polling = async () => {
            try {
                const response = await pollingPayment(params.orderId);
                // Assuming response contains { slipUrl: string }
                if (response.status === StatusCode.BAD_REQUEST) {
                    clearInterval(intervalMount); // Stop polling
                }
                if (response.slipUrl) {
                    setSlipUrl(response.slipUrl);
                    setLoading(false);
                    clearInterval(intervalMount); // Stop polling
                }
            } catch (error) {
                console.error("Error polling payment status:", error);
            }
        };

        const intervalMount = setInterval(() => {
            polling();
        }, 1000);

        // Cleanup interval on unmount
        return () => clearInterval(intervalMount);
    }, [params.orderId]);

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
            <h1 className="text-2xl font-semibold mb-4">Payment Successful</h1>
            <div className="bg-white p-4 rounded shadow-lg">
                {slipUrl && <Link href={slipUrl}>Go to slip!</Link>}
            </div>
        </div>
    );
}
