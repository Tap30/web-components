import { DefaultTheme } from "vitepress";

export default [
  {
    text: 'Getting Started',
    link: '/getting-started',
  },
  {
    text: 'Components',
    link: '/components/tap-avatar',
  },
  {
    text: 'Related Links',
    items: [
      {text: 'Icon Library', link: 'https://tap30.github.io/icons', target: '_blank'},
    ],
  }
] as DefaultTheme.NavItem[]
