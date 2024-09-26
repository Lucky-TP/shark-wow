import { UserRole } from "./models/enums";

export interface UserToken {
    uid: string;
    role: UserRole;
}
