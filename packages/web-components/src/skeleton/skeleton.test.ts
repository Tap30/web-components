import {
  beforeEach,
  describe,
  expect,
  render,
  test,
} from "@internals/test-helpers";
import { ErrorMessages } from "./constants.ts";

describe("🧩 skeleton", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("🧪 should fit to content in `text` variant", async ({ page }) => {
    await render(
      page,
      `
    <tapsi-skeleton
      data-testid="test-skeleton"
      variant="text"
    >
      <div style="width: 200px;height: 400px;"></div>
    </tapsi-skeleton>
    `,
    );
    const skeleton = page.getByTestId("test-skeleton");
    const box = await (await skeleton.elementHandle())?.boundingBox();

    const { width, height } = box!;

    expect(width).toBe(200);
    expect(height).toBe(400);
  });

  test("🧪 should apply correct class to root based on variant", async ({
    page,
  }) => {
    const variants = ["rectangular", "circular", "pill", "text"];

    for (const variant of variants) {
      await render(
        page,
        `<tapsi-skeleton data-testid="test-skeleton" variant="${variant}"></tapsi-skeleton>`,
      );

      const root = page.locator('tapsi-skeleton [part="root"]');

      await expect(root).toHaveClass(` root ${variant} `);
    }
  });

  test("🧪 should get size from `width` and `height` attributes in all variants expect `text`", async ({
    page,
  }) => {
    const allowedVariants = ["rectangular", "circular", "pill"];
    const skeleton = page.getByTestId("test-skeleton");

    for (const variant of allowedVariants) {
      await render(
        page,
        `
        <tapsi-skeleton
          data-testid="test-skeleton"
          variant="${variant}"
          width="200px"
          height="300px"
        ></tapsi-skeleton>
         `,
      );

      const boundingBox = await (await skeleton.elementHandle())?.boundingBox();

      const { width, height } = boundingBox!;

      expect(width).toBe(200);
      expect(height).toBe(300);
    }

    // it should not be the same for `text` variant

    await render(
      page,
      `
        <tapsi-skeleton
          data-testid="test-skeleton"
          variant="text"
          width="200px"
          height="300px"
        ></tapsi-skeleton>
         `,
    );

    const boundingBox = await (await skeleton.elementHandle())?.boundingBox();

    const { width, height } = boundingBox!;

    expect(width).not.toBe(200);
    expect(height).not.toBe(300);
  });

  test("🧪 should set the ratio of width to the height based on `ratio` attribute in `rectangular` variant", async ({
    page,
  }) => {
    const width = 300;
    const inputRatioValues = [0.5, 1, 2, 5];
    const skeleton = page.getByTestId("test-skeleton");

    for (const ratio of inputRatioValues) {
      await render(
        page,
        `
        <tapsi-skeleton
          data-testid="test-skeleton"
          variant="rectangular"
          width="${width}px"
          ratio="${ratio}"
        ></tapsi-skeleton>
         `,
      );

      const boundingBox = await (await skeleton.elementHandle())?.boundingBox();

      const { height } = boundingBox!;

      expect(height).toBe(width / ratio);
    }

    const errors: string[] = [];

    page.on("console", msg => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await render(
      page,
      `
        <tapsi-skeleton
          data-testid="test-skeleton"
          variant="text"
          width="200px"
          ratio="2"
        ></tapsi-skeleton>
         `,
    );

    expect(errors[0]).toContain(
      ErrorMessages.SET_RATIO_ONLY_IN_RECTANGULAR_VARIANT,
    );
  });
});
