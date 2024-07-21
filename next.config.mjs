/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
                pathname: "/**", // Match all paths under lh3.googleusercontent.com
            },
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
                port: "",
                pathname: "/**", // Match all paths under firebasestorage.googleapis.com
            },
        ],
    },
};
export default nextConfig;
