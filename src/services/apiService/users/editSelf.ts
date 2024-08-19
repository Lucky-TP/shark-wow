import axios from "axios";
import { apiPath } from "src/constants/routePath";
import { EditUserPayloadKeys } from "src/constants/payloadKeys/user";
import { EditUserPayload } from "src/interfaces/payload/userPayload";
import { DefaultResponse } from "src/interfaces/response/commonResponse";

export async function editSelf(
    payload: EditUserPayload
): Promise<DefaultResponse> {
    const {
        firstName,
        lastName,
        aboutMe,
        address,
        contact,
        profileImageFile,
        cvFile,
    } = payload;

    const formData = new FormData();

    if (firstName) {
        formData.append(EditUserPayloadKeys.firstName, firstName);
    }
    if (lastName) {
        formData.append(EditUserPayloadKeys.lastName, lastName);
    }
    if (aboutMe) {
        formData.append(EditUserPayloadKeys.aboutMe, aboutMe);
    }
    if (address) {
        formData.append(EditUserPayloadKeys.address, JSON.stringify(address));
    }
    if (contact) {
        formData.append(EditUserPayloadKeys.contact, JSON.stringify(contact));
    }
    if (profileImageFile) {
        formData.append(EditUserPayloadKeys.profileImageFile, profileImageFile);
    }
    if (cvFile) {
        formData.append(EditUserPayloadKeys.cvFile, cvFile);
    }
    try {
        const response = await axios.put(apiPath.USERS.EDIT_SELF, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error: unknown) {
        throw new Error("Edit user-self failed");
    }
}
