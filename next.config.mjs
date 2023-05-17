/** @type {import("next").NextConfig} */
const config = {
    experimental: {
        appDir: true,
    },

    images: {
        domains: ["avatars.githubusercontent.com", "uploadthing.com"],
    },
};
export default config;
