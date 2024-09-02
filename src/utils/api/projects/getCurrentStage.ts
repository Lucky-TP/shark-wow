import { StageStatus } from "src/interfaces/models/enums";
import { Stage } from "src/interfaces/models/project";

export function getCurrentStage(stages: Stage[]): Stage | undefined {
    return stages.filter((stage) => stage.status === StageStatus.CURRENT)[0];
}
