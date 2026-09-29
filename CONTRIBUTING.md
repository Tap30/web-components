# Contributing to Tapsi Design System's Monorepo

If you're reading this, you're definitely awesome! <br /> The following is a set
of guidelines for contributing to Tapsi Design System's Monorepo, which are
hosted in the
[Tapsi Design System's Monorepo](https://github.com/Tap30/web-components). These
are mostly guidelines, not rules. Use your best judgment, and feel free to
propose changes to this document in a pull request.

## Code of Conduct

This project and everyone participating in it is governed by the
[Code of Conduct](https://github.com/Tap30/web-components/blob/main/CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code.

## A large spectrum of contributions

There are many ways to contribute, code contribution is one aspect of it. For
instance, documentation improvements are as important as code changes.

## Your first Pull Request

Working on your first Pull Request? You can learn how from this free video
series:

[How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

To help you get your feet wet and get you familiar with our contribution
process, we have a list of
[good first issues](https://github.com/Tap30/web-components/issues?q=is:open+is:issue+label:"good+first+issue")
that contain changes that have a relatively limited scope. This label means that
there is already a working solution to the issue in the discussion section.
Therefore, it is a great place to get started.

We also have a list of
[good to take issues](https://github.com/Tap30/web-components/issues?q=is:open+is:issue+label:"good+to+take").
This label is set when there has been already some discussion about the solution
and it is clear in which direction to go. These issues are good for developers
that want to reduce the chance of going down a rabbit hole.

You can also work on any other issue you choose to. The "good first" and "good
to take" issues are just issues where we have a clear picture about scope and
timeline. Pull requests working on other issues or completely new problems may
take a bit longer to review when they don't fit into our current development
cycle.

If you decide to fix an issue, please be sure to check the comment thread in
case somebody is already working on a fix. If nobody is working on it at the
moment, please leave a comment stating that you have started to work on it so
other people don't accidentally duplicate your effort.

If somebody claims an issue but doesn't follow up for more than a week, it's
fine to take it over but you should still leave a comment. If there has been no
activity on the issue for 7 to 14 days, it is safe to assume that nobody is
working on it.

## Sending a Pull Request

Pull Requests are always welcome, but, before working on a large change, it is
best to open an issue first to discuss it with the maintainers.

When in doubt, keep your Pull Requests small. To give a Pull Request the best
chance of getting accepted, don't bundle more than one feature or bug fix per
Pull Request. It's often best to create two smaller Pull Requests than one big
one.

1. Fork the repository.

2. Clone the fork to your local machine and add upstream remote:

```sh
git clone https://github.com/<your username>/web-components.git
cd web-components
git remote add upstream https://github.com/Tap30/web-components.git
```

3. Synchronize your local `main` branch with the upstream one:

```sh
git checkout main
git pull upstream main
```

4. Sync and install the engines using
   [Corepack](https://pnpm.io/installation#using-corepack) or
   [Volta](https://volta.sh/)

5. Install the dependencies with `pnpm` (`npm` and `yarn` aren't supported):

```sh
pnpm install
```

6. Create a new topic branch:

```sh
git switch -c my-topic-branch
```

7. Make changes, commit and push to your fork:

```sh
git push -u origin HEAD
```

8. Go to [the repository](https://github.com/Tap30/web-components) and make a
   Pull Request.

The core team is monitoring for Pull Requests. We will review your Pull Request
and either merge it, request changes to it, or close it with an explanation.

### Development server

Start developing server and watch for code changes:

```sh
pnpm dev
```

There are two playgrounds, one per generation of the design system, because they
are styled by different token sets and cannot share a page:

- **`playground/lit`** (`pnpm dev:lit`, port 5173) — `@tapsioss/web-components`
  and `@tapsioss/react-components`. Edit `playground/lit/src/index.ts` (for
  native stuffs) or `playground/lit/src/react-root.tsx` (for React stuffs), and
  `playground/lit/index.html` to use your registered web components. It pins
  `@tapsioss/theme` to the published **`0.8.0`**, the pre-1.0 token set these
  components are styled against.
- **`playground/react`** (`pnpm dev:react`, port 5174) — `@tapsioss/react-ui`.
  Edit `playground/react/src/index.tsx`. It uses the workspace `@tapsioss/theme`
  (1.x).

Both name the _same_ package at different versions; pnpm gives each its own
`node_modules`, and each playground's `tsconfig.json` sets `"paths": {}` so the
root's source aliases cannot override the pin. Add or change a dependency in a
playground's `package.json` and that is what it gets — nothing else to update.

Because `paths` is empty, a playground resolves packages through their `exports`
map, i.e. their **built output**. Run `pnpm build:packages` (or leave a watcher
running) after changing a package. Storybook is the run-from-source environment.

### Dev scripts

| Command                     | Runs                                           |
| --------------------------- | ---------------------------------------------- |
| `pnpm dev`                  | every package in watch mode + both playgrounds |
| `pnpm dev:lit`              | the lit track's packages + its playground      |
| `pnpm dev:react`            | the react track's packages + its playground    |
| `pnpm dev:packages`         | watchers for every package                     |
| `pnpm dev:packages:lit`     | watchers for the lit track only                |
| `pnpm dev:packages:react`   | watchers for the react track only              |
| `pnpm dev:playground:lit`   | the lit playground alone                       |
| `pnpm dev:playground:react` | the react playground alone                     |
| `pnpm storybook:react`      | Storybook, port 6006                           |

A "track" is not a hand-maintained list: `dev:packages:<track>` selects
`--filter "@tapsioss/<track>-playground^..."`, which is pnpm for _the workspace
dependencies of that playground, excluding it_. So the lit track watches
web-components and react-components but not `theme` (it comes from npm there),
and the react track watches react-ui and theme but not web-components. Add a
dependency to a playground and its track picks it up automatically.

Note that `packages/theme` has **no** `dev` script — there is nothing to watch —
so a token change needs `pnpm --filter @tapsioss/theme run build` before a
playground sees it. Storybook reads the theme from source and does not.

### Building

You can build the project, including all type definitions, with:

```sh
pnpm build
```

### Testing

To run all the tests, run:

```sh
pnpm test
```

### Coding style

Please follow the coding style of the project. We use `prettier` and `eslint`,
so if possible, enable linting in your editor to get real-time feedback.

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Please use the following commit message conventions for consistent and
  informative commit history:
  - **feat**: A new feature
  - **fix**: A bug fix
  - **docs**: Documentation only changes
  - **style**: Changes that do not affect the meaning of the code (white-space,
    formatting, missing semi-colons, etc)
  - **refactor**: A code change that neither fixes a bug nor adds a feature
  - **perf**: A code change that improves performance
  - **test**: Adding missing or correcting existing tests
  - **build**: Changes that affect the build system or external dependencies
    (example scopes: gulp, broccoli, npm)
  - **ci**: Changes to our CI configuration files and scripts (example scopes:
    Travis, Circle, BrowserStack, SauceLabs)
  - **chore**: Other changes that don't modify src or test files
  - **revert**: Reverts a previous commit

## License

By contributing your code to the `Tap30/*` GitHub repositories, you agree to
license your contribution under the
[MIT license](https://github.com/Tap30/web-components/blob/main/LICENSE).
