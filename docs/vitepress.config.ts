import { defineConfig } from "vitepress";
import nav from "./nav.ts";
import sidebar from "./sidebar.ts";
import socialLinks from "./social-links.ts";

export default defineConfig({
  title: "Tapsi Design System",
  description: "A set of components based on Tapsi design system.",
  base: "/web-components/",
  head: [
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: "true",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap",
      },
    ],
  ],
  themeConfig: {
    sidebar,
    socialLinks,
    nav,
  },
});
