import { ProjectFileType, UserFileType } from "src/constants/payloadKeys/file";

const projectFileTypes: ProjectFileType[] = ["carousel", "general"];
const userFileTypes: UserFileType[] = ["profile", "cv", "general"];

// guard
export function isProjectFileType(type: string): type is ProjectFileType {
    return projectFileTypes.includes(type as ProjectFileType);
}

// guard
export function isUserFileType(type: string): type is UserFileType {
    return userFileTypes.includes(type as UserFileType);
}
