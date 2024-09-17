"use client";
import React from "react";
import Link from "next/link";
import CarouselCreatorCard from "../CreatorCard/CarouselCreator/CarouselCreatorCard";
import { PopularCreator } from "src/interfaces/datas/user";

type Props = {
    topCreator: PopularCreator[];
};

export default function PopularCreatorCard({ topCreator }: Props) {
    return (
        <>
            {topCreator.length != 0 && (
                <section className="bg-orange-50 p-10">
                    <div className="flex flex-row items-center justify-between">
                        <h2 className="text-3xl font-bold mb-4">Popular Creator</h2>
                        <span>
                            <Link href="/catargories">
                                <p>View All</p>
                            </Link>
                        </span>
                    </div>
                    <CarouselCreatorCard data={topCreator} />
                </section>
            )}
        </>
    );
}
