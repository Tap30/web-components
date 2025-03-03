// import {
//   afterEach,
//   beforeEach,
//   describe,
//   disposeMocks,
//   expect,
//   render,
//   setupMocks,
//   test,
// } from "@internals/test-helpers";
// import type { Locator } from "@playwright/test";
//
// const testIds = {
//   banner: "test-pinwheel",
// };
//
// const expectPinwheelItems = (pinwheelItem: Locator[]) => {
//   return {
//     toBeSelected: async () => {
//       for (const chip of pinwheelItem) {
//         await expect(chip).toHaveAttribute("selected");
//       }
//     },
//     notToBeSelected: async () => {
//       for (const chip of pinwheelItem) {
//         await expect(chip).not.toHaveAttribute("selected");
//       }
//     },
//   };
// };
//
// describe("🧩 pinwheel", () => {
//   beforeEach(async ({ page }) => {
//     await page.goto("/");
//   });
//
//   afterEach(async ({ page }) => {
//     await disposeMocks(page);
//   });
//
//   test("🧪should be able to change selected item using click", async ({
//     page,
//   }) => {
//     await render(
//       page,
//       `
//     <tapsi-pinwheel data-testid="test-pinwheel">
//       <tapsi-pinwheel-item value="value-1" data-testid="test-pinwheel-item-1" value="1">آیتم ۱</tapsi-pinwheel-item>
//       <tapsi-pinwheel-item value="value-2" data-testid="test-pinwheel-item-2" value="2">آیتم ۲</tapsi-pinwheel-item>
//       <tapsi-pinwheel-item value="value-3" data-testid="test-pinwheel-item-3" value="3">آیتم ۳</tapsi-pinwheel-item>
//     </tapsi-pinwheel>
//     `,
//     );
//
//     const pinwheel = page.getByTestId("test-pinwheel");
//     const item1 = page.getByTestId("test-pinwheel-item-1");
//     const item2 = page.getByTestId("test-pinwheel-item-2");
//     const item3 = page.getByTestId("test-pinwheel-item-3");
//
//
//
//     await expectPinwheelItems([item1]).toBeSelected();
//     await expectPinwheelItems([item2, item3]).notToBeSelected();
//
//
//     await item2.click();
//     await expectPinwheelItems([item2]).toBeSelected();
//     await expectPinwheelItems([item1, item3]).notToBeSelected();
//   });
//
//   test("🧪should be able to change selected item using up and down arrow keys", async ({
//     page,
//   }) => {
//     await render(
//       page,
//       `
//     <tapsi-pinwheel data-testid="test-pinwheel">
//       <tapsi-pinwheel-item value="value-1" data-testid="test-pinwheel-item-1" value="1">آیتم ۱</tapsi-pinwheel-item>
//       <tapsi-pinwheel-item value="value-2" data-testid="test-pinwheel-item-2" value="2">آیتم ۲</tapsi-pinwheel-item>
//       <tapsi-pinwheel-item value="value-3" data-testid="test-pinwheel-item-3" value="3">آیتم ۳</tapsi-pinwheel-item>
//     </tapsi-pinwheel>
//     `,
//     );
//
//     const pinwheel = page.getByTestId("test-pinwheel");
//     const item1 = page.getByTestId("test-pinwheel-item-1");
//     const item2 = page.getByTestId("test-pinwheel-item-2");
//     const item3 = page.getByTestId("test-pinwheel-item-3");
//
//
//
//     await expectPinwheelItems([item1]).toBeSelected();
//     await expectPinwheelItems([item2, item3]).notToBeSelected();
//
//     await page.keyboard.press("Tab");
//     await expect(pinwheel).toBeFocused();
//
//     await page.keyboard.press("ArrowDown");
//     await expectPinwheelItems([item2]).toBeSelected();
//     await expectPinwheelItems([item1, item3]).notToBeSelected();
//
//     await page.keyboard.press("ArrowDown");
//     await expectPinwheelItems([item3]).toBeSelected();
//     await expectPinwheelItems([item1, item3]).notToBeSelected();
//
//     await page.keyboard.press("ArrowUp");
//     await expectPinwheelItems([item2]).toBeSelected();
//     await expectPinwheelItems([item1, item3]).notToBeSelected();
//
//   });
//
//   test("🧪 should trigger the `activechange` event by changing the active item using click", async ({
//     page,
//   }) => {
//     await render(
//       page,
//       `
//     <tapsi-pinwheel data-testid="test-pinwheel">
//       <tapsi-pinwheel-item value="value-1" data-testid="test-pinwheel-item-1">آیتم ۱</tapsi-pinwheel-item>
//       <tapsi-pinwheel-item value="value-2" data-testid="test-pinwheel-item-2">آیتم ۲</tapsi-pinwheel-item>
//       <tapsi-pinwheel-item value="value-3" data-testid="test-pinwheel-item-3">آیتم ۳</tapsi-pinwheel-item>
//       <tapsi-pinwheel-item value="value-4" data-testid="test-pinwheel-item-4">آیتم ۴</tapsi-pinwheel-item>
//     </tapsi-pinwheel>
//     `,
//     );
//
//     const container = page.getByTestId("test-pinwheel");
//     const item1 = page.getByTestId("test-pinwheel-item-1");
//     const item2 = page.getByTestId("test-pinwheel-item-2");
//     const item3 = page.getByTestId("test-pinwheel-item-3");
//     const item4 = page.getByTestId("test-pinwheel-item-4");
//
//     const mocks = await setupMocks(page);
//     const fn = mocks.createFakeFn();
//
//     await mocks.events.attachMockedEvent(container, "activechange", fn.ref);
//
//     await fn.matchResult({ called: false });
//
//     await item1.click();
//     await fn.matchResult({ callCount: 1 });
//     await expectPinwheelItems([item1]).toBeSelected();
//     await expectPinwheelItems([item2, item3, item4]).notToBeSelected();
//
//     await item2.click();
//     await fn.matchResult({ callCount: 2 });
//     await expectPinwheelItems([item2]).toBeSelected();
//     await expectPinwheelItems([item1, item3, item4]).notToBeSelected();
//
//     await item3.click();
//     await fn.matchResult({ callCount: 3 });
//     await expectPinwheelItems([item3]).toBeSelected();
//     await expectPinwheelItems([item1, item2, item4]).notToBeSelected();
//
//     await item4.click();
//     await fn.matchResult({ callCount: 4 });
//     await expectPinwheelItems([item4]).toBeSelected();
//     await expectPinwheelItems([item1, item2, item3]).notToBeSelected();
//   });
//
//   test("🧪 should trigger the `activechange` event by changing the active item using keyboard navigation", async ({
//     page,
//   }) => {
//     await render(
//       page,
//       `
//     <tapsi-pinwheel data-testid="test-pinwheel">
//       <tapsi-pinwheel-item data-testid="test-pinwheel-item-1" value="value-1">آیتم ۱</tapsi-pinwheel-item>
//       <tapsi-pinwheel-item data-testid="test-pinwheel-item-2" value="value-2">آیتم ۲</tapsi-pinwheel-item>
//       <tapsi-pinwheel-item data-testid="test-pinwheel-item-3" value="value-3">آیتم ۳</tapsi-pinwheel-item>
//       <tapsi-pinwheel-item data-testid="test-pinwheel-item-4" value="value-4">آیتم ۴</tapsi-pinwheel-item>
//     </tapsi-pinwheel>
//     `,
//     );
//
//     const container = page.getByTestId("test-pinwheel");
//     const item1 = page.getByTestId("test-pinwheel-item-1");
//     const item2 = page.getByTestId("test-pinwheel-item-2");
//     const item3 = page.getByTestId("test-pinwheel-item-3");
//     const item4 = page.getByTestId("test-pinwheel-item-4");
//
//     const mocks = await setupMocks(page);
//     const fn = mocks.createFakeFn();
//
//     await mocks.events.attachMockedEvent(container, "activechange", fn.ref);
//
//     await fn.matchResult({ called: false });
//
//     await page.keyboard.press("Tab");
//     await page.keyboard.press("Space");
//     await fn.matchResult({ callCount: 1 });
//     await expectPinwheelItems([item1]).toBeSelected();
//     await expectPinwheelItems([item2, item3, item4]).notToBeSelected();
//
//     await page.keyboard.press("Tab");
//     await page.keyboard.press("Space");
//     await fn.matchResult({ callCount: 2 });
//     await expectPinwheelItems([item2]).toBeSelected();
//     await expectPinwheelItems([item1, item3, item4]).notToBeSelected();
//
//     await page.keyboard.press("Tab");
//     await page.keyboard.press("Space");
//     await fn.matchResult({ callCount: 3 });
//     await expectPinwheelItems([item3]).toBeSelected();
//     await expectPinwheelItems([item1, item2, item4]).notToBeSelected();
//
//     await page.keyboard.press("Tab");
//     await page.keyboard.press("Space");
//     await fn.matchResult({ callCount: 4 });
//     await expectPinwheelItems([item4]).toBeSelected();
//     await expectPinwheelItems([item1, item2, item3]).notToBeSelected();
//   });
// });
