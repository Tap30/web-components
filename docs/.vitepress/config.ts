import { defineConfig } from "vitepress";
import nav from "./nav";
import sidebar from "./sidebar";
import socialLinks from "./socialLinks";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Tapsi components",
  description: "A set of components based on Tapsi design system.",
  base: "/web-components/",
  vite: {},
  themeConfig: {
    sidebar,
    socialLinks,
    nav,
  },
});
