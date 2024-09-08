"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import CarouselCreatorCard from "../CreatorCard/CarouselCreator/CarouselCreatorCard";
import { PopularCreator } from "src/interfaces/datas/user";
import { getTenPopularUsers } from "src/services/apiService/users/getTenPopularUsers";
import LoadingSection from "../global/LoadingSection";

type Props = {};

export default function PopularCreatorCard({}: Props) {
    const [data, setData] = useState<PopularCreator[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await getTenPopularUsers();
            console.log(data);
            setData(data.data);
        } catch (error) {
            setError("An error occurred while fetching products.");
            console.error("An error occurred while fetching products:", error);
        } finally {
            console.log(data);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            {loading && (
                <p>
                    <LoadingSection />
                </p>
            )}
            {error && <p>Error: {error}</p>}
            {!loading && data.length != 0 && (
                <section className="bg-white p-10">
                    <div className="flex flex-row items-center justify-between">
                        <h2 className="text-3xl font-bold mb-4">
                            Popular Creator
                        </h2>
                        <span>
                            <Link href="/catargories">
                                <p>View All</p>
                            </Link>
                        </span>
                    </div>
                    <CarouselCreatorCard data={data} />
                </section>
            )}
        </>
    );
}
