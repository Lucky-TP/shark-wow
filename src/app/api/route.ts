import { NextRequest, NextResponse } from "next/server";
import { ProjectModel } from "src/interfaces/models/project";
import { getCollectionRef } from "src/libs/databases/firestore";
import { updateProject } from "src/libs/databases/projects";
import { getProjects } from "src/libs/databases/projects/getProjects";
import { errorHandler } from "src/libs/errors/apiError";
import { chunkArray } from "src/utils/api/queries";

interface Data {
    projectId: string;
}

export async function PUT(request: NextRequest) {
    try {
        const projectCollection = getCollectionRef("/projects");
        const querySnapshot = await projectCollection.select("projectId").get();
        const projectIds = querySnapshot.docs.map((snapshot) => {
            const data = snapshot.data() as Data;
            return data.projectId;
        });
        const chunks = chunkArray<string>(projectIds, 30);
        const projectModels: ProjectModel[] = [];
        for (const chunk of chunks) {
            projectModels.push(...(await getProjects(chunk)));
        }
        const promises = projectModels.map((projectModel) => {
            return updateProject(projectModel.projectId, {
                carouselImageUrls: [
                    ...projectModel.carouselImageUrls,
                    "https://firebasestorage.googleapis.com/v0/b/shark-wow.appspot.com/o/projects%2FafsBkloNg7ZsrHWfwANlQmnWFh32%2FwhLQIea368sS6PBkBwrz%2F1725593728505?alt=media&token=f7dbc917-33a3-46af-bd08-643d0cddc88e",
                ],
            });
        });
        await Promise.all(promises);
        return NextResponse.json({ message: "Lucky" }, { status: 200 });
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
