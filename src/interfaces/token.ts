import { UserRole } from "./models/enums";

export interface UserToken {
    uid: string;
    email: string;
    role: UserRole;
}
