import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/static";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [
  // Enable Preact to support Preact JSX components.
  preact(),
  // Enable React for the Algolia search component.
  react(), sitemap()],
  adapter: vercel({
    analytics: true
  }),
  site: `https://www.entity-of.xyz`
});