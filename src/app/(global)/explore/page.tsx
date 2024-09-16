import React from "react";
import MainExplore from "src/components/global/Explore/MainExplore";
import { ProjectCategories } from "src/constants/projectCategoriesEnum";
import { getProjectByCategories } from "src/services/apiService/projects/getProjectByCategories";
import { getTenPopularProjects } from "src/services/apiService/projects/getTenPopularProjects";
import { ShowProject } from "src/interfaces/datas/project";

type Props = {};

async function page({}: Props) {
    const categories: ProjectCategories[] = [
        ProjectCategories.ART,
        ProjectCategories.TECHNOLOGY,
        ProjectCategories.EDUCATION,
        ProjectCategories.FILM,
        ProjectCategories.MUSIC,
        ProjectCategories.FOOD,
        ProjectCategories.TRANSPORTATION,
        ProjectCategories.HEALTH,
        ProjectCategories.GAME,
    ];
    let topProjects: ShowProject[] = [];
    let mixedCategoryProjects: ShowProject[] = [];
    let error: string | null = null;

    try {
        const [fetchTopProjectsResult, fetchMixedCategoryProjectsResult] = await Promise.all([
            getTenPopularProjects(),
            getProjectByCategories(categories),
        ]);
        topProjects = fetchTopProjectsResult.data;
        mixedCategoryProjects = fetchMixedCategoryProjectsResult.data;
    } catch (err) {
        console.error("Failed to fetch data:", err);
        error = "Failed to load data. Please try again later.";
    }

    return (
        <section>
            {error && <div>{error}</div>}
            {!error && (
                <MainExplore
                    categories={categories}
                    topProjects={topProjects}
                    mixedCategoryProjects={mixedCategoryProjects}
                />
            )}
        </section>
    );
}

export default page;
