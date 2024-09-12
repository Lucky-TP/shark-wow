"use client";
import React, { useEffect, useMemo, useState } from "react";
import CarouselProductCard from "src/components/NewProductCard/CarouselProduct/CarouselProductCard";
import CarouselTrendingProductCard from "./CarouselProductTopTen/CarouselTrendingProduct";
import CategoryProductCard from "./CategoryProduct/CategoryProductCard";
import SearchBar from "../SearchBar";
import { ShowProject } from "src/interfaces/datas/project";
import { getProjectByCategories } from "src/services/apiService/projects/getProjectByCategories";
import LoadingPage from "../LoadingPage";
import { ProjectCategories } from "src/constants/projectCategoriesEnum";

interface CategoryProjects {
    food: ShowProject[];
    technology: ShowProject[];
    art: ShowProject[];
    film: ShowProject[];
    education: ShowProject[];
    music: ShowProject[];
    transportation: ShowProject[];
    health: ShowProject[];
    game: ShowProject[];
}

export default function MainExplore() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const categories: ProjectCategories[] = useMemo(
        () => [
            ProjectCategories.ART,
            ProjectCategories.TECHNOLOGY,
            ProjectCategories.EDUCATION,
            ProjectCategories.ART,
            ProjectCategories.FILM,
            ProjectCategories.MUSIC,
            ProjectCategories.FOOD,
            ProjectCategories.TRANSPORTATION,
            ProjectCategories.HEALTH,
            ProjectCategories.GAME,
        ],
        []
    );
    const [categoryProjects, setCategoryProjects] = useState<CategoryProjects>({
        technology: [],
        education: [],
        art: [],
        film: [],
        music: [],
        food: [],
        transportation: [],
        health: [],
        game: [],
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const groupingCategoryShowProjects = (showProjects: ShowProject[]): CategoryProjects => {
            const categoryProjects: CategoryProjects = {
                food: [],
                technology: [],
                art: [],
                film: [],
                education: [],
                music: [],
                transportation: [],
                health: [],
                game: [],
            };

            showProjects.forEach((showProject) => {
                switch (showProject.category) {
                    case ProjectCategories.FOOD:
                        categoryProjects.food.push(showProject);
                        break;
                    case ProjectCategories.TECHNOLOGY:
                        categoryProjects.technology.push(showProject);
                        break;
                    case ProjectCategories.ART:
                        categoryProjects.art.push(showProject);
                        break;
                    case ProjectCategories.FILM:
                        categoryProjects.film.push(showProject);
                        break;
                    case ProjectCategories.EDUCATION:
                        categoryProjects.education.push(showProject);
                        break;
                    case ProjectCategories.MUSIC:
                        categoryProjects.music.push(showProject);
                        break;
                    case ProjectCategories.TRANSPORTATION:
                        categoryProjects.transportation.push(showProject);
                        break;
                    case ProjectCategories.HEALTH:
                        categoryProjects.health.push(showProject);
                        break;
                    case ProjectCategories.GAME:
                        categoryProjects.game.push(showProject);
                        break;
                    default:
                        break;
                }
            });
            return categoryProjects;
        };

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getProjectByCategories(categories);
                const groupedProjects = groupingCategoryShowProjects(response.data);
                setCategoryProjects(groupedProjects);
            } catch (error) {
                setError("An error occurred while fetching data.");
                console.error("An error occurred while fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [categories]);

    if (loading) return <LoadingPage />;
    if (error) return <p>Error: {error}</p>;

    const handleCategoryClick = (category: string | null) => {
        setSelectedCategory(category);
    };

    return (
        <section className="flex flex-col justify-between py-[3vh] h-full w-full bg-orange-50">
            <div className="flex">
                <div style={{ width: `21%` }}></div>
                <div className="pb-[3vh]" style={{ width: `73%` }}>
                    <SearchBar />
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
                    <ul
                        className="flex flex-col gap-y-[1.5vh] pl-[2vw] pr-[4vw] "
                    >
                        {categories.map((category, i) => (
                            <li
                                key={i}
                                className={`cursor-pointer pl-[2vw]  w-full text-left sm:text-lg lg:text-xl font-medium   hover:text-orange-600 
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
                    {!selectedCategory && (
                        <>
                            <CarouselTrendingProductCard />
                            {categoryProjects.technology.length != 0 && (
                                <CarouselProductCard
                                    title="Technology"
                                    data={categoryProjects.technology}
                                />
                            )}
                            {categoryProjects.education.length != 0 && (
                                <CarouselProductCard
                                    title="Education"
                                    data={categoryProjects.education}
                                />
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
                                <CarouselProductCard
                                    title="Transportation"
                                    data={categoryProjects.transportation}
                                />
                            )}
                            {categoryProjects.health.length != 0 && (
                                <CarouselProductCard
                                    title="Health"
                                    data={categoryProjects.health}
                                />
                            )}
                            {categoryProjects.game.length != 0 && (
                                <CarouselProductCard title="Game" data={categoryProjects.game} />
                            )}
                        </>
                    )}
                    {selectedCategory && <CategoryProductCard category={selectedCategory} />}
                </div>
            </div>
        </section>
    );
}
