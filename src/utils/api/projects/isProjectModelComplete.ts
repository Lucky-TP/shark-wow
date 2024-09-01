import { ProjectModel } from "src/interfaces/models/project";

export function isProjectModelComplete(projectModel: ProjectModel): boolean {
    const requiredFields = [
        projectModel.name,
        projectModel.carouselImageUrls,
        projectModel.description,
        projectModel.address,
        projectModel.category,
        projectModel.stages,
        projectModel.story,
        projectModel.update,
        projectModel.website,
    ];

    return requiredFields.every((field) => {
        if (typeof field === "string") {
            return field.trim() !== "";
        }
        if (Array.isArray(field)) {
            return field.length > 0;
        }
        return field !== null && field !== undefined;
    });
}
