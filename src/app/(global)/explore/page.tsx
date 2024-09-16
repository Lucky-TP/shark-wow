import React from "react";
import MainExplore from "src/components/global/Explore/MainExplore";
import { ProjectCategories } from "src/constants/projectCategoriesEnum";
import { getProjectByCategories } from "src/services/apiService/projects/getProjectByCategories";
import { getTenPopularProjects } from "src/services/apiService/projects/getTenPopularProjects";

type Props = {};

export default async function page({}: Props) {
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

    const [fetchTopProjectsResult, fetchMixedCategoryProjectsResult] = await Promise.all([
        getTenPopularProjects(),
        getProjectByCategories(categories),
    ]);
    const mixedCategoryProjects = fetchMixedCategoryProjectsResult.data;
    const topProjects = fetchTopProjectsResult.data;

    return (
        <section>
            <MainExplore
                categories={categories}
                topProjects={topProjects}
                mixedCategoryProjects={mixedCategoryProjects}
            />
        </section>
    );
}
