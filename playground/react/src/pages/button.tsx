import { Button } from "@tapsioss/react-ui";
import type * as React from "react";

const row: React.CSSProperties = {
  display: "flex",
  gap: "0.75rem",
  alignItems: "center",
  flexWrap: "wrap",
};

// Sized like a `@tapsioss/react-icons` icon at its default `size="auto"`: it
// fills whatever box the button gives it. The playground deliberately does not
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
      r="10"
      fill="currentColor"
    />
  </svg>
);

const dot = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 16 16"
    aria-hidden="true"
  >
    <circle
      cx="8"
      cy="8"
      r="7"
      fill="yellow"
    />
  </svg>
);

/**
 * The 8 variant × hierarchy pairs that exist in Figma, plus sizes, adornments
 * and the disabled/loading states.
 *
 * Rendered inside the theme layout, so it may be mounted once or once per theme
 * depending on the controls — keep it free of anything that assumes a single
 * instance, such as a fixed DOM id.
 */
export const ButtonPage = () => (
  <div style={{ display: "grid", gap: "1rem" }}>
    <div style={row}>
      <Button
        variant="default"
        hierarchy="primary"
      >
        اصلی
      </Button>
      <Button
        variant="default"
        hierarchy="secondary"
      >
        ثانویه
      </Button>
      <Button
        variant="default"
        hierarchy="tertiary"
      >
        سوم
      </Button>
      <Button variant="elevated">شناور</Button>
      <Button variant="cta">فراخوان</Button>
    </div>

    <div style={row}>
      <Button
        variant="destructive"
        hierarchy="primary"
      >
        حذف
      </Button>
      <Button
        variant="destructive"
        hierarchy="secondary"
      >
        حذف
      </Button>
      <Button
        variant="destructive"
        hierarchy="tertiary"
      >
        حذف
      </Button>
    </div>

    <div style={row}>
      <Button size="sm">کوچک</Button>
      <Button size="md">متوسط</Button>
      <Button size="lg">بزرگ</Button>
    </div>

    <div style={row}>
      <Button leadingAdornment={<Glyph />}>با آیکون ابتدایی متوسط</Button>
      <Button trailingAdornment={<Glyph />}>با آیکون انتهایی متوسط</Button>
      <Button
        size="sm"
        leadingAdornment={<Glyph />}
        trailingAdornment={<Glyph />}
      >
        با آیکون - کوچک
      </Button>
      <Button
        size="lg"
        variant="destructive"
        hierarchy="secondary"
        leadingAdornment={<Glyph />}
        trailingAdornment={<Glyph />}
      >
        با آیکون - بزرگ
      </Button>
      <Button
        leadingAdornment={dot}
        trailingAdornment={dot}
      >
        هر دو کاستوم
      </Button>
    </div>

    <div style={row}>
      <Button fullWidth>تمام عرض</Button>
    </div>

    <div style={row}>
      {/* Overflowing content is clipped, never wrapped — the height is fixed. */}
      <Button style={{ maxInlineSize: "140px" }}>
        یک متن بسیار طولانی که جا نمی‌شود
      </Button>
    </div>

    <div style={row}>
      <Button disabled>غیرفعال</Button>
      <Button loading>در حال بارگذاری</Button>
      <Button
        loading
        disabled
      >
        در حال بارگذاری
      </Button>
      <Button
        href="https://tapsi.ir"
        target="_blank"
      >
        لینک
      </Button>
    </div>
  </div>
);
