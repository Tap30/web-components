import { defineConfig } from "vitepress";
import sidebar from "../sidebar";
import socialLinks from "../social-links";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Tapsi components",
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
  },
});
