import {
  afterEach,
  describe,
  disposeMocks,
  expect,
  render,
  setupMocks,
  test,
} from "@internals/test-helpers";

describe("switch", () => {
  afterEach(async ({ page }) => {
    await disposeMocks(page);
  });

  test("T1", async ({ page }) => {
    await page.goto("/");

    await render(page, '<div data-testid="testtest">hello</div>');

    const myEl = page.getByTestId("testtest");

    const mocks = await setupMocks(page);
    const fn = mocks.createFakeFn();

    await mocks.events.attachMockedEvent(myEl, "click", fn.ref);

    await expect(page).toHaveURL("http://localhost:5173");
    await expect(page).toHaveTitle("Playground");

    await expect(myEl).toHaveText("hello");

    await myEl.click();
    await myEl.click();
    await myEl.click();
    await myEl.click();
    await myEl.click();
    await myEl.click();

    await fn.matchResult({ called: true, callCount: 6 });
  });
});
