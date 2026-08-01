import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import netlifyReactRouter from "@netlify/vite-plugin-react-router";
import netlify from "@netlify/vite-plugin";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRouter(), netlifyReactRouter(), netlify()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
