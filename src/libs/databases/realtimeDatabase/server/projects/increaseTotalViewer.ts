import { ProjectRealtimeDbModel } from "src/interfaces/realtimeDatabase/model";
import { getRealtimeDbRef } from "../commons/getRealtimeDbRef";
import { RealtimeDbRefPath } from "src/constants/realtimeDatabase/realtimeDbRefPath";

// non sensitive function, maybe not need to handle on error
export async function increaseTotalViewer(projectId: string) {
    try {
        const projectRef = getRealtimeDbRef(RealtimeDbRefPath.PROJECT, projectId);
        await projectRef.transaction((currentData: ProjectRealtimeDbModel | null) => {
            if (!currentData) {
                const newData: ProjectRealtimeDbModel = { totalViewer: 1 };
                return newData;
            }
            currentData.totalViewer += 1;
            return currentData;
        });
    } catch (error: unknown) {
        console.log(error);
    }
}
