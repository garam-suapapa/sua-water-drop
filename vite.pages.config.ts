import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({base:"/sua-water-drop/",plugins:[react()],build:{outDir:"pages-dist"}});
