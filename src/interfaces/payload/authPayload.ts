import { Address } from "../models/common";

export interface UserIdTokenPayload {
    userIdToken: string;
}

export interface EmailSignInPayload {
    email: string;
    password: string;
}

export interface EmailSignUpPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthDate: number;
    address: Address;
}

export interface EmailSignUpWithToken extends EmailSignUpPayload {
    userIdToken: string;
}

export interface EmailSignInPayload {
    email: string;
    password: string;
}
