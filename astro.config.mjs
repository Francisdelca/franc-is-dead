import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://franc.is.dead",
  integrations: [sitemap()],
});
