export const SITE = {
  title: "Entity.of",
  description: "Entity.of official documentation",
  defaultLanguage: "en-us",
} as const;

export const OPEN_GRAPH = {
  image: {
    src: "https://github.com/withastro/astro/blob/main/assets/social/banner-minimal.png?raw=true",
    alt:
      "astro logo on a starry expanse of space," +
      " with a purple saturn-like planet floating in the right foreground",
  },
  twitter: "",
};

export const KNOWN_LANGUAGES = {
  English: "en",
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const GITHUB_EDIT_URL = `https://github.com/AlexandruCalinica/entity-of-docs`;

export const COMMUNITY_INVITE_URL = `https://astro.build/chat`;

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
  indexName: "XXXXXX",
  appId: "XXXXXXX",
  apiKey: "XXXXXXXX",
};

export type Sidebar = Record<
  (typeof KNOWN_LANGUAGE_CODES)[number],
  Record<string, { text: string; link: string }[]>
>;
export const SIDEBAR: Sidebar = {
  en: {
    "Getting Started": [
      { text: "Introduction", link: "en/introduction" },
      { text: "Install", link: "en/install" },
      { text: "First steps", link: "en/first-steps" },
      { text: "Examples", link: "en/examples" },
      { text: "Tutorials", link: "en/tutorials" },
      { text: "Integrations", link: "en/integrations" },
      { text: "Concept & Philosophy", link: "en/philosophy" },
      { text: "Contribution guide", link: "en/contribute" },
    ],
    // API: [{ text: "Page 4", link: "en/page-4" }],
  },
};
