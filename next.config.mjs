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
            {
                protocol: "https",
                hostname: "storage.googleapis.com",
                port: "",
                pathname: "/**", // Match all paths under storage.googleapis.com
            },
            {
                protocol: "https",
                hostname: "pay.stripe.com",
                port: "",
                pathname: "/receipts/payment/**",
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: "/__/auth/:path*",
                destination: "https://shark-wow.firebaseapp.com/__/auth/:path*",
            },
        ];
    },
};
export default nextConfig;
