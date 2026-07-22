import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://francis.delca.dev",
  integrations: [sitemap()],
  adapter: cloudflare(),
});