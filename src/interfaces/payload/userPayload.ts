import { Address } from "../models/common";
import { Contact } from "../models/user";

export interface EditUserPayload {
    username: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    aboutMe: string;
    address: Address[];
    contact: Contact;
    profileImageUrl: string;
    cvUrl: string;
    interestCategories: string[];
    accountBank: string;
    accountNumber: string;
}
