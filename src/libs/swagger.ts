import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
    const spec = createSwaggerSpec({
        apiFolder: "src/app/api",
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Next Swagger API Example",
                version: "1.0",
            },
            components: {
                securitySchemes: {
                    CookieAuth: {
                        type: "apiKey",
                        in: "cookie",
                        name: "token",
                    },
                },
                // schemas: {
                //     EditUserPayload: {
                //         type: "object",
                //         properties: {
                //             firstName: {
                //                 type: "string",
                //                 description: "User's first name",
                //             },
                //             lastName: {
                //                 type: "string",
                //                 description: "User's last name",
                //             },
                //             aboutMe: {
                //                 type: "string",
                //                 description: "Short bio or description of the user",
                //             },
                //             address: {
                //                 type: "object",
                //                 properties: {
                //                     street: {
                //                         type: "string",
                //                         description: "Street address",
                //                     },
                //                     city: {
                //                         type: "string",
                //                         description: "City",
                //                     },
                //                     state: {
                //                         type: "string",
                //                         description: "State or province",
                //                     },
                //                     zipCode: {
                //                         type: "string",
                //                         description: "Postal code",
                //                     },
                //                     country: {
                //                         type: "string",
                //                         description: "Country",
                //                     },
                //                 },
                //             },
                //             contact: {
                //                 type: "object",
                //                 properties: {
                //                     email: {
                //                         type: "string",
                //                         description: "User's email address",
                //                     },
                //                     phone: {
                //                         type: "string",
                //                         description: "User's phone number",
                //                     },
                //                 },
                //             },
                //             profileImageUrl: {
                //                 type: "string",
                //                 description: "URL of the user's profile image",
                //             },
                //             agreement: {
                //                 type: "boolean",
                //                 description: "Whether the user has agreed to terms",
                //             },
                //         },
                //     },
                // },
            },
        },
    });
    return spec;
};
