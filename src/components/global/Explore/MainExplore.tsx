"use client"
import React, { useState } from "react";
import CarouselProductCard from "src/components/NewProductCard/CarouselProduct/CarouselProductCard";
import CarouselTrendingProductCard from "./CarouselProductTopTen/CarouselTrendingProduct";
import CategoryProductCard from "./CategoryProduct/CategoryProductCard";
import SearchBar from "../SearchBar";
import { ShowProject } from "src/interfaces/datas/project";
import { groupingCategoryShowProjects } from "src/utils/projects/groupingCategoryShowProjects";

interface Props {
    categories: string[];
    topProjects: ShowProject[];
    mixedCategoryProjects: ShowProject[];
}

export default function MainExplore({ categories, topProjects, mixedCategoryProjects }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchResults, setSearchResults] = useState<ShowProject[] | null>(null);
    const categoryProjects = groupingCategoryShowProjects(mixedCategoryProjects);

    const handleCategoryClick = (category: string | null) => {
        setSelectedCategory(category);
        setSearchResults(null);
    };

    const handleSearch = (projects: ShowProject[]) => {
        setSearchResults(projects);
    };

    return (
        <section className="flex flex-col justify-between py-[3vh] h-full w-full bg-orange-50">
            <div className="flex">
                <div style={{ width: `21%` }}></div>
                <div className="pb-[3vh]" style={{ width: `73%` }}>
                    <SearchBar onSearch={handleSearch} />
                </div>
            </div>
            <div className="flex">
                <div className="flex flex-col" style={{ width: `21%` }}>
                    <h3
                        className="sm:text-xl lg:text-2xl text-orange-600 font-bold text-left ml-12 mb-4 cursor-pointer"
                        onClick={() => handleCategoryClick(null)}
                    >
                        Category
                    </h3>
                    <ul className="flex flex-col gap-y-[1.5vh] pl-[2vw] pr-[4vw] ">
                        {categories.map((category, i) => (
                            <li
                                key={i}
                                className={`cursor-pointer pl-[2vw]  w-full text-left sm:text-lg lg:text-xl font-medium hover:text-orange-600 
                                    rounded-xl hover:bg-orange-200 transition-colors duration-500 py-[0.5vh]
                                    ${selectedCategory === category ? "text-orange-600 bg-orange-200" : "text-orange-400"} 
                                `}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="text-xl flex flex-col" style={{ width: `73%` }}>
                    {searchResults ? (
                        searchResults.length > 0 ? (
                            <CarouselProductCard title="Search Results" data={searchResults} />
                        ) : (
                            <p>No projects found for the search term.</p>
                        )
                    ) : (
                        <>
                            {!selectedCategory && (
                                <>
                                    <CarouselTrendingProductCard topProjects={topProjects} />
                                    {categoryProjects.technology.length != 0 && (
                                        <CarouselProductCard title="Technology" data={categoryProjects.technology} />
                                    )}
                                    {categoryProjects.education.length != 0 && (
                                        <CarouselProductCard title="Education" data={categoryProjects.education} />
                                    )}
                                    {categoryProjects.art.length != 0 && (
                                        <CarouselProductCard title="Art" data={categoryProjects.art} />
                                    )}
                                    {categoryProjects.film.length != 0 && (
                                        <CarouselProductCard title="Film" data={categoryProjects.film} />
                                    )}
                                    {categoryProjects.music.length != 0 && (
                                        <CarouselProductCard title="Music" data={categoryProjects.music} />
                                    )}
                                    {categoryProjects.food.length != 0 && (
                                        <CarouselProductCard title="Food" data={categoryProjects.food} />
                                    )}
                                    {categoryProjects.transportation.length != 0 && (
                                        <CarouselProductCard title="Transportation" data={categoryProjects.transportation} />
                                    )}
                                    {categoryProjects.health.length != 0 && (
                                        <CarouselProductCard title="Health" data={categoryProjects.health} />
                                    )}
                                    {categoryProjects.game.length != 0 && (
                                        <CarouselProductCard title="Game" data={categoryProjects.game} />
                                    )}
                                </>
                            )}
                            {selectedCategory && <CategoryProductCard category={selectedCategory} />}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
