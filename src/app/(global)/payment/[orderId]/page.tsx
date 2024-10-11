"use client";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingPage from "src/components/global/LoadingPage";
import { StatusCode } from "src/constants/statusCode";
import { pollingPayment } from "src/services/apiService/payments/pollingPayment";

export default function PaymentCheckingPage({ params }: { params: { orderId: string } }) {
    const [loading, setLoading] = useState<boolean>(true);
    const [slipUrl, setSlipUrl] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const canceled = searchParams.get("canceled");

        if (canceled === "true") {
            setLoading(false);
            router.push("/");
            return;
        }

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
    }, [params.orderId, searchParams]);

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="mb-4 text-2xl font-semibold">Payment Successful</h1>
            <div className="rounded bg-white p-4 shadow-lg">
                {slipUrl && (
                    <Link href={slipUrl} target="_blank">
                        Go to slip!
                    </Link>
                )}
            </div>
        </div>
    );
}
