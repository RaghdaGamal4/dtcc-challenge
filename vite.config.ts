import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [react()],
    base: "",
    resolve: {
        alias: {
            "@": __dirname + "/src"
        }
    },
    envDir: "./environments",
    build: {
        outDir: `./dist/${mode}`
    }
}));
