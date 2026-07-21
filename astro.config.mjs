import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://francis.delca.dev",
  integrations: [sitemap()],
});
