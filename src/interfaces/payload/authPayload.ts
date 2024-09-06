import { Address } from "../models/common";

export interface EmailSignInPayload {
    email: string;
    password: string;
}

export interface EmailSignUpPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthDate: string;
    address: Address;
}

export interface EmailSignInPayload {
    email: string;
    password: string;
}
