import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@appwrite": path.resolve(__dirname, "./src/appwrite/"),
            "@assets": path.resolve(__dirname, "./src/assets/"),
            "@components": path.resolve(__dirname, "./src/components/"),
            "@config": path.resolve(__dirname, "./src/config/"),
            "@pages": path.resolve(__dirname, "./src/pages/"),
            "@store": path.resolve(__dirname, "./src/store/"),
        },
    },
});
