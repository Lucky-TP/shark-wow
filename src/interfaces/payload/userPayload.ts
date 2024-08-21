import { Address } from "../models/common";
import { Contact } from "../models/user";

export interface EditUserPayload {
    firstName: string;
    lastName: string;
    aboutMe: string;
    address: Partial<Address>[];
    contact: Partial<Contact>;
    profileImageUrl: string;
    cvUrl: string;
}
