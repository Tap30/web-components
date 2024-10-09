import { DefaultTheme } from "vitepress";

export default [
  {
    text: "Getting Started",
    link: "/dev/getting-started",
  },
  {
    text: "Components",
    link: "/dev/components/tap-avatar",
  },
  {
    text: "Design Guidelines",
    link: "/design/guidelines",
  },
  {
    text: "Related Links",
    items: [
      {
        text: "Icon Library",
        link: "https://tap30.github.io/icons",
        target: "_blank",
      },
    ],
  },
] as DefaultTheme.NavItem[];
