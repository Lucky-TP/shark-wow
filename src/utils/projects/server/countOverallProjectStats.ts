import { ProjectStatus } from "src/interfaces/models/enums";
import { ProjectModel } from "src/interfaces/models/project";
import { CreatorProjectStats } from "src/interfaces/datas/common";

export function countOverallProjectStats(projectsModel: ProjectModel[]): CreatorProjectStats {
    const overallProjectStats: CreatorProjectStats = {
        launched: 0,
        drafted: 0,
        completed: 0,
        failed: 0,
    };
    projectsModel.forEach((projectModel) => {
        switch (projectModel.status) {
            case ProjectStatus.RUNNING:
                overallProjectStats.launched += 1;
                break;
            case ProjectStatus.DRAFT:
                overallProjectStats.drafted += 1;
                break;
            case ProjectStatus.SUCCESS:
                overallProjectStats.completed += 1;
                break;
            case ProjectStatus.FAIL:
                overallProjectStats.failed += 1;
                break;
            default:
                break;
        }
    });
    return overallProjectStats;
}
