"use client";

import React, { useEffect, useState } from "react";
import { ShowProject } from "src/interfaces/datas/project";
import { getTenPopularProjects } from "src/services/apiService/projects/getTenPopularProjects";
import Link from "next/link";
import CarouselProductCard from "src/components/NewProductCard/CarouselProduct/CarouselProductCard";
import LoadingSection from "../global/LoadingSection";

type Props = {};

export default function PopularProject({}: Props) {
    const [topproducts, setTopProducts] = useState<ShowProject[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await getTenPopularProjects();
            console.log(data);
            setTopProducts(data.data);
        } catch (error) {
            setError("An error occurred while fetching products.");
            console.error("An error occurred while fetching products:", error);
        } finally {
            console.log(topproducts);
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
            {!loading && topproducts.length != 0 && (
                <section className="bg-orange-50 p-10">
                    <div className="flex flex-row items-center justify-between">
                        <h2 className="text-3xl font-bold mb-4">Popular Project</h2>
                        <span>
                            <Link href="/catargories">
                                <p>View All</p>
                            </Link>
                        </span>
                    </div>
                    <CarouselProductCard title="" data={topproducts} />
                </section>
            )}
        </>
    );
}
