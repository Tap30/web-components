import { Row } from "@tapsioss/react-ui";

// Sized like a `@tapsioss/react-icons` icon at its default `size="auto"`: it
// fills whatever box the row gives it. The playground deliberately does not
// depend on the icon package, so the react-ui track never waits on its build.
const Glyph = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle
      cx="12"
      cy="12"
      r="4"
      fill="currentColor"
    />
  </svg>
);

// A stand-in for the navigation chevron Figma shows in the trailing slot. It
// points left because the design is RTL: "forward" is towards the inline end.
const Chevron = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      d="M15 6l-6 6 6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const column = { display: "grid", maxInlineSize: "360px" } as const;

/**
 * Both Figma variants (Standard, Reversed), with and without each slot, the
 * badge, the divider, wrapping and ellipsis, and the row rendered as a list
 * item, a link and a button.
 *
 * Rendered inside the theme layout, so it may be mounted once or once per
 * theme — keep it free of anything that assumes a single instance.
 */
export const RowPage = () => (
  <div style={{ display: "grid", gap: "1.5rem" }}>
    <div style={column}>
      <Row
        label="عنوان"
        description="توضیحات"
        leading={<Glyph />}
        trailing={<Glyph />}
      />
      <Row
        reversed
        label="عنوان"
        description="توضیحات"
        leading={<Glyph />}
        trailing={<Glyph />}
      />
    </div>

    <div style={column}>
      <Row label="فقط عنوان" />
      <Row
        label="بدون آیکون انتهایی"
        description="توضیحات"
        leading={<Glyph />}
      />
      <Row
        label="بدون آیکون ابتدایی"
        description="توضیحات"
        trailing={<Glyph />}
      />
      <Row
        label="با نشان"
        description="توضیحات"
        leading={<Glyph />}
        badge
      />
      <Row
        label="با پیکان"
        leading={<Glyph />}
        trailing={
          // Figma's order: the icon, then the chevron at the inline end.
          <>
            <Glyph />
            <Chevron />
          </>
        }
      />
      <Row
        label="بدون جداکننده"
        description="توضیحات"
        leading={<Glyph />}
        divider={false}
      />
    </div>

    <div style={column}>
      {/* The row grows rather than clips when its text wraps. */}
      <Row
        label="یک عنوان بسیار طولانی که در یک خط جا نمی‌شود و به خط بعد می‌رود"
        description="و یک توضیح طولانی که آن هم باید بدون بریده شدن نمایش داده شود"
        leading={<Glyph />}
        trailing={<Chevron />}
      />
      {/* The same text, kept to one line per row and truncated. */}
      <Row
        textOverflow="ellipsis"
        label="یک عنوان بسیار طولانی که در یک خط جا نمی‌شود و به خط بعد می‌رود"
        description="و یک توضیح طولانی که آن هم باید بدون بریده شدن نمایش داده شود"
        leading={<Glyph />}
        trailing={<Chevron />}
      />
    </div>

    <ul style={{ ...column, margin: 0, padding: 0, listStyle: "none" }}>
      <Row
        render={<li />}
        label="به‌عنوان آیتم فهرست"
        leading={<Glyph />}
      />
      <Row
        render={<li />}
        label="آیتم دوم فهرست"
        leading={<Glyph />}
      />
    </ul>

    <div style={column}>
      {/* `href` makes it an <a>, `onClick` a <button> — the row decides. */}
      <Row
        href="#row"
        label="به‌عنوان لینک"
        leading={<Glyph />}
        trailing={<Chevron />}
      />
      <Row
        onClick={() => undefined}
        label="به‌عنوان دکمه"
        leading={<Glyph />}
        trailing={<Chevron />}
      />
    </div>
  </div>
);
