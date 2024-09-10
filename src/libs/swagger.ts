import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
    const spec = createSwaggerSpec({
        apiFolder: "src/app/api", // define api folder under app folder
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
                        name: "token", // Assuming your JWT is stored in a cookie named 'token'
                    },
                },
            },
            security: [
                {
                    CookieAuth: [],
                },
            ],
        },
    });
    return spec;
};
