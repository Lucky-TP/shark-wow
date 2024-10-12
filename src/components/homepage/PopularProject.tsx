"use client";

import React from "react";
import { ShowProject } from "src/interfaces/datas/project";
import Link from "next/link";
import CarouselProductCard from "src/components/NewProductCard/CarouselProduct/CarouselProductCard";

type Props = {
    topProjects: ShowProject[];
};

export default function PopularProject({ topProjects }: Props) {
    return (
        <>
            {topProjects.length != 0 && (
                <section className="bg-orange-50 p-10">
                    <div className="flex flex-row items-center justify-between">
                        <h2 className="text-3xl font-bold mb-4">Popular Project</h2>
                        <span>
                            <Link href="/explore">
                                <p>View All</p>
                            </Link>
                        </span>
                    </div>
                    <CarouselProductCard title="" data={topProjects} />
                </section>
            )}
        </>
    );
}
