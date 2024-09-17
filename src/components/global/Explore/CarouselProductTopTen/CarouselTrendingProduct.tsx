"use client";
import React from "react";
import CarouselProductCard from "src/components/NewProductCard/CarouselProduct/CarouselProductCard";
import { ShowProject } from "src/interfaces/datas/project";

type Props = {
    topProjects: ShowProject[];
};

export default function CarouselTrendingProductCard({ topProjects }: Props) {
    return (
        <section className="flex flex-col justify-between py-[3vh] h-full w-full ">
            <CarouselProductCard title="Top 10 Popular Projects" data={topProjects} />
        </section>
    );
}
