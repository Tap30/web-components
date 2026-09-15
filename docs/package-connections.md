# Package Connections

How every workspace package depends on and relates to the others, derived from
the root `package.json` wireit graph and each package's declared dependencies.

## Workspace members

| Package name                 | Path                        | Public? |
| ---------------------------- | --------------------------- | ------- |
| `@tapsioss/theme`            | `packages/theme`            | ✅      |
| `@tapsioss/icons`            | `packages/icons`            | ✅      |
| `@tapsioss/web-icons`        | `packages/web-icons`        | ✅      |
| `@tapsioss/react-icons`      | `packages/react-icons`      | ✅      |
| `@tapsioss/web-components`   | `packages/web-components`   | ✅      |
| `@tapsioss/react-components` | `packages/react-components` | ✅      |
| `@tapsioss/docs`             | `docs`                      | private |
| `@tapsioss/playground`       | `playground`                | private |
| `@internals/test-helpers`    | `internals/test-helpers`    | private |
| `@internals/danger`          | `internals/danger`          | private |

---

## Dependency graph

```
@tapsioss/theme
    │
    └──► @tapsioss/web-components  (runtime dep)
    └──► @tapsioss/docs            (runtime dep)
    └──► @tapsioss/playground      (runtime dep)

@tapsioss/icons
    │
    ├──► @tapsioss/web-icons       (runtime dep)
    ├──► @tapsioss/react-icons     (runtime dep + code generation source)
    ├──► @tapsioss/docs            (runtime dep)
    └──► @tapsioss/playground      (runtime dep)

@tapsioss/web-components
    │   (also produces metadata.json at build time)
    │
    ├──► @tapsioss/react-components  (runtime dep + metadata.json consumed by code generator)
    ├──► @tapsioss/docs              (runtime dep)
    └──► @tapsioss/playground        (runtime dep)

@tapsioss/react-components
    └──► @tapsioss/playground        (runtime dep)

@tapsioss/web-icons
    └──► @tapsioss/playground        (runtime dep)

@tapsioss/react-icons
    └──► @tapsioss/playground        (runtime dep)

@internals/test-helpers
    └──► @tapsioss/web-components    (devDependency — Playwright test harness)
```

---

## Build order (wireit)

Wireit enforces the correct build sequence. The critical path for
`pnpm build:packages`:

```
@tapsioss/theme
    └── build:theme
            │
            └──► gen:metadata  ──► build:web-components ──► build:react-components
                                         │
                     build:icons ────────┤
                          │              └──► (also needs theme built for tests)
                          ├──► build:web-icons
                          └──► build:react-icons
```

Serialized order guaranteed by wireit:

1. `build:theme` and `build:icons` — no inter-package dependencies; can run in
   parallel
2. `gen:metadata` — requires web-components source (no prior build needed, just
   source files)
3. `build:web-components` — requires `gen:metadata` output
   (`custom-elements.json`, `metadata.json`)
4. `build:web-icons` and `build:react-icons` — require `build:icons`; run in
   parallel with each other
5. `build:react-components` — requires `build:web-components` (reads
   `metadata.json` at generate time)
6. `build:docs` — requires `build:packages` + `gen:metadata`

---

## Key cross-package data flows

### `metadata.json` (the central coordination artifact)

`@tapsioss/web-components` produces two files during `gen:metadata`:

- `custom-elements.json` — standard Custom Elements Manifest (CEM), consumed by
  tooling
- `metadata.json` — enriched component metadata (props, events, slots, compound
  relationships)

`metadata.json` is read **by file path** (not as an npm import) by:

- `packages/react-components/scripts/generate.ts` — to code-generate React
  wrappers
- `docs/` — to populate the component API reference

### `@tapsioss/icons` as a code generation source

`@tapsioss/react-icons/scripts/build.ts` does
`import icons from "@tapsioss/icons"` at build time and iterates over every icon
entry to generate one React component file per icon into `dist/`. The icons
package must be built before react-icons can build.

### `@tapsioss/web-components` as a runtime dependency of `@tapsioss/react-components`

`createComponent` (from `@lit/react`) wraps the actual custom element class,
which is imported directly from `@tapsioss/web-components`. Both packages are
versioned together (linked in changesets config) so their versions always match.

---

## Testing dependencies

`pnpm test` (root) runs only `test:web-components`. Its wireit dependencies:

- `build:theme` — components import theme CSS tokens at runtime in the browser
- `build:web-components` — produces the `dist/` that the playground serves

The playground is started automatically by `playwright.config.ts`'s `webServer`
config using `pnpm --filter @tapsioss/playground run start:test`.

---

## Versioning (changesets)

Two linked version groups — both packages in a group always release together:

| Group      | Packages                                                          |
| ---------- | ----------------------------------------------------------------- |
| Components | `@tapsioss/web-components`, `@tapsioss/react-components`          |
| Icons      | `@tapsioss/icons`, `@tapsioss/web-icons`, `@tapsioss/react-icons` |

Private packages (`@internals/*`, `@tapsioss/docs`, `@tapsioss/playground`) are
excluded from release.
