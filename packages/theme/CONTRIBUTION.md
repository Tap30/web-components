# Contributing to `@tapsioss/theme`

This package holds the design tokens — every colour, font size, spacing step and
radius in the Tapsi Design System, as both CSS variables and TypeScript values.

This guide is for the **person who owns the tokens**: a designer or developer
who needs to get a change out of Figma and into the code. It assumes no
knowledge of how the package is built.

If you are an AI agent, read [`AGENTS.md`](./AGENTS.md) instead — it is the full
specification.

---

## The short version

1. Export the tokens from Figma with the custom plugin.
2. Drop the files into `figma-output-jsons/`, replacing what is there.
3. Ask an agent to regenerate the token sets, pointing it at `AGENTS.md`.
4. Run `pnpm --filter @tapsioss/theme run check`. It either passes or tells you
   exactly what is wrong.
5. Open a PR with a changeset.

You are responsible for **step 1 and 2**. The agent does step 3. Step 4 is how
you know it worked.

---

## How the tokens are organised

There are **two layers**, and the difference matters when you are deciding where
a change belongs.

**Primitives** — the raw scales. Every colour in the palette, every font size,
every number on the spacing scale. These are just values; they carry no meaning
about where they are used.

```
--tapsi-palette-gray-white: #ffffff;
--tapsi-number-16: 1rem;
```

**Themes** — one file per product per mode (`ride/light`, `ride/dark`,
`drive/light`, `drive/dark`). These give the primitives a job. Nothing here has
a value of its own; everything points at a primitive.

```
--tapsi-color-surface-primary: var(--tapsi-palette-gray-white);
```

An app imports the primitives once and **one** theme on top:

```css
@import "@tapsioss/theme/tokens.css";
@import "@tapsioss/theme/ride/light.css";
```

Swapping that second line is the entire mechanism for switching product or
theme. Components only ever reference theme tokens, never primitives, which is
what makes this work.

### Where does my change belong?

| You want to…                                | Change in Figma                            |
| ------------------------------------------- | ------------------------------------------ |
| Adjust a brand colour everywhere it is used | the **primitive** it points at             |
| Change what colour a surface uses           | the **theme** alias, per mode              |
| Make drive look different from ride         | the **theme**, in drive's file only        |
| Add a new colour to the palette             | the **primitive** collection               |
| Add a new semantic name                     | the **theme** collection, in **all** modes |

A new semantic token added to only one mode will fail the check, because the
theme files must stay in step with each other.

## Step 1 — export from Figma

**Use the custom plugin, not Figma's built-in variable export.**

This is not a preference. Figma's own export flattens references: a token that
says "primary surface is white gray" comes out as just `#FFFFFF`, and the link
back to the palette is gone. Rebuilding those links afterwards is guesswork, and
guessing wrong produces a dark theme that looks plausible and is wrong.

The custom plugin keeps the links, which is why it is the only supported source.

You should end up with five files:

```
figma-output-jsons/
  primitive.json
  ride-theme-tokens/ride-light.json
  ride-theme-tokens/ride-dark.json
  drive-theme-tokens/drive-light.json
  drive-theme-tokens/drive-dark.json
```

Open one and sanity-check that values look like `"Palette.Gray.White"` rather
than `"#FFFFFF"`. If you see raw hex where you expect a reference, the export
was made with the wrong tool — stop, and re-export.

These files never ship to users. They live in the repo as the record of what
Figma said.

## Step 2 — replace the files

Drop them into `figma-output-jsons/`, overwriting the existing ones. Keep the
directory and file names exactly as above; the tooling looks for them by name.

Adding a **new product** or a **new theme** is fine — a new file, or a new
`<product>-theme-tokens/` directory. Mention it in step 3, because a new set
needs to be registered in one place by hand.

## Step 3 — hand it to an agent

Give the agent something like:

> I have updated the token exports in `packages/theme/figma-output-jsons/`.
> Please regenerate the token sets under `packages/theme/src/` following
> `packages/theme/AGENTS.md`, then run the check.

**What the agent should produce:**

- `src/tokens.css` and `src/tokens.ts` — the primitives
- `src/<product>/<theme>.css` and `.ts` — one pair per theme
- nothing else

**What the agent must not do:**

- invent a token that is not in your export
- "fix" a value that looks wrong — that is a conversation, not a code change
- commit a generation script (the rules live in `AGENTS.md` by design)
- touch `figma-output-jsons/` — those are yours

**If something in your export is ambiguous or contradictory, the agent should
stop and ask you rather than guess.** If you get back a confident answer to a
question you did not expect it to be able to answer, be suspicious.

## Step 4 — check it

```bash
pnpm --filter @tapsioss/theme run check
```

This is the important one. It re-derives every token from your JSON files and
compares against what was generated. It verifies that:

- every token in your export made it into both the CSS and the TypeScript
- nothing was invented that is not in your export
- names follow the Figma path exactly
- values are converted correctly (px → rem, alpha → `rgba()`, and so on)
- theme tokens point at primitives instead of hard-coding values
- the CSS and the TypeScript agree with each other

A pass looks like:

```
✅ 142 primitives + 4 theme(s), 638 tokens verified against figma-output-jsons/
```

A failure names the exact token and what is wrong with it:

```
❌ ride/light.css is missing --tapsi-color-surface-elevated (Color/Surface/Elevated)
❌ ride/light.css: --tapsi-color-surface-primary holds the literal "#ffffff";
   theme tokens must reference a primitive so the layer stays swappable
```

Then build and check the rest of the repo still compiles:

```bash
pnpm --filter @tapsioss/theme run build
pnpm check:lint
```

## Step 5 — look at it

Numbers passing is not the same as the design being right. Open Storybook:

```bash
pnpm storybook:react
```

Under **Theme** you will find galleries for Colors, Typography and Layout. Every
swatch is painted with the real CSS variable and prints its value next to it, so
if those two ever disagree you can see it.

Under **React UI** you can see the tokens in use on real components.

**To switch theme**, use the **Theme** dropdown in the toolbar at the top — one
list of all four: `ride-light`, `ride-dark`, `drive-light`, `drive-dark`. Set
**Layout** to _All four themes_ and a story renders four times at once, side by
side. That is the quickest way to see whether a colour you just changed works
everywhere.

The token galleries have their own row of theme buttons just under the heading,
because a docs page cannot read the toolbar.

The React playground (`pnpm dev:react`) has the same controls: a theme dropdown
and a _Show all four at once_ checkbox.

None of this requires editing a file, and nothing in the components changes when
you switch — they only ever reference theme tokens, never the palette. That is
the property worth checking, and the quickest way to confirm a new theme is
wired up correctly.

## Step 6 — open a PR

Token changes are user-visible, so they need a changeset:

```bash
pnpm changesets:create
```

Pick `@tapsioss/theme`, choose the bump, and describe the change in terms a
consumer cares about ("added `surface-elevated`", "brand orange darkened"), not
in terms of files.

**Renaming or removing a token is a breaking change** — it silently breaks every
app using the old name, because a CSS variable that does not exist simply
renders nothing. Call it out explicitly and list the old → new mapping.

---

## Conventions worth knowing

**Names come from Figma, unchanged.** `Color/Surface/Accent-Light` becomes
`--tapsi-color-surface-accent-light`. The layer name never appears in the token
name. If you want a token called something else, rename it in Figma — not here.

**Everything is rem, never px.** Figma's `16` becomes `1rem`. This means a user
who increases their browser font size scales the whole interface, not just the
text. The conversion happens once, on the way in.

**Font weights come from the Figma key, not the value.** `Font/Weight/400` has
the value `"Regular"` in Figma, but CSS needs `400`. The token carries `400`.

**Transparent colours use `rgba()`.** Figma gives 8-digit hex like `#00000080`;
that notation is not supported on the older Android devices this system targets,
where it renders as fully transparent rather than falling back. So it ships as
`rgba(0, 0, 0, 0.5)`.

**Typography and spacing are duplicated in every theme file.** They happen to be
identical across all four today, but each theme file is deliberately
self-contained. Change the type scale and you change it in all four.

**CSS and TypeScript are generated side by side and neither comes from the
other.** Editing one by hand will not update the other — the check will catch
it, but it is easier not to hand-edit either.

## Known gaps

Worth knowing before you go looking for them:

- **No `Stroke` tokens.** The old `--tapsi-stroke-1` / `--tapsi-stroke-2` are
  gone; border widths now come from `--tapsi-number-1` / `--tapsi-number-2`.
  Figma still has a Stroke page, so this may be an export omission — if you
  expect stroke tokens, check with whoever maintains the plugin.
- **No `Shadow` tokens**, for the same reason.
- **Three line heights are off the number scale** (30, 42 and 60). They are
  hard-coded, and will not follow if you change the spacing scale. Adding those
  steps to `Number` in Figma would fix it.
- **Overlay colours are the same in light and dark.** Both modes use the dark
  alpha values. That may be intended; it is what the export says.

## What is still on the old tokens

`@tapsioss/web-components` (the Lit components) and the VitePress docs site have
not been moved to the new two-layer tokens. They are pinned to the last pre-1.0
release, `@tapsioss/theme@0.8.0`, so they keep working:

- **the docs site** installs `@tapsioss/theme` at `0.8.0` from npm instead of
  the workspace copy — its pages are unchanged and still show the old token
  tables
- **`playground/lit`** does the same, so the Lit components render correctly
  there
- **`playground/react`** uses the workspace 1.x, for `@tapsioss/react-ui`

The two playgrounds are separate precisely so that each can have its own version
of the tokens. They ask for the _same_ package name and get different versions,
which is normal in a pnpm workspace.

**Do not "fix" those pins to point at the workspace copy.** Without 0.8.0, every
Lit component loses its spacing and its rounded corners. They move to the new
tokens when the Lit components are migrated, which is a separate piece of work.

If you change a token in Figma today, it flows into `@tapsioss/react-ui` and the
Storybook galleries — **not** into the Lit components or the docs site, which
are frozen on 0.8.0 until they are migrated.
