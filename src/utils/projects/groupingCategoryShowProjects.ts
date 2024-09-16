import { ProjectCategories } from "src/constants/projectCategoriesEnum";
import { ShowProject } from "src/interfaces/datas/project";

export interface CategoryProjects {
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

export const groupingCategoryShowProjects = (showProjects: ShowProject[]): CategoryProjects => {
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
