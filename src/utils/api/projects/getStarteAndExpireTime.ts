import { Stage } from "src/interfaces/models/project";

export function getStartAndExpireTime(stages: Stage[]) {
    return {
        startDate: stages[0].startDate,
        expireDate: stages[2].expireDate,
    };
}
