import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// `base: "./"` keeps asset paths relative, so the built site also works from
// a GitHub Pages sub-path (…github.io/<repo>/) without changes.
export default defineConfig({
  plugins: [vue()],
  base: "./",
});
