import {defineConfig} from 'vitepress';
import sidebar from "./sidebar";
import socialLinks from "./socialLinks";
import nav from "./nav";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Tapsi components',
  description: 'A set of components based on Tapsi design system.',
  base: "/web-components/",
  themeConfig: {
    sidebar,
    socialLinks,
    nav
  },
});
