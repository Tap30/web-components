import { expect, fixture, html } from "@open-wc/testing";
import "../../dist/badge/index.js";
import { type TapBadge } from "./index";

describe("test tap-badge", () => {
  it("should render badge with default properties", async () => {
    const el = await fixture<TapBadge>(html` <tap-badge></tap-badge>`);

    expect(el).to.exist;
    expect(el?.getAttribute("value")).to.equal("");
    expect(el?.getAttribute("type")).to.equal("pill");
    expect(el?.getAttribute("variant")).to.equal("inverse");
    expect(el?.getAttribute("priority")).to.equal("high");
    expect(el?.leadingIcon).to.be.false;
  });

  it("should reflects properties to attributes", async () => {
    const el = await fixture<TapBadge>(
      html` <tap-badge
        value="123"
        type="numeral"
        variant="success"
        priority="low"
        leadingIcon
      ></tap-badge>`,
    );

    expect(el?.getAttribute("value")).to.equal("123");
    expect(el?.getAttribute("type")).to.equal("numeral");
    expect(el?.getAttribute("variant")).to.equal("success");
    expect(el?.getAttribute("priority")).to.equal("low");
    expect(el?.leadingIcon).to.be.true;
  });

  it("should conditionally renders dot badge", async () => {
    const el = await fixture<TapBadge>(
      html`<tap-badge type="dot"></tap-badge>`,
    );

    const badge = el.shadowRoot!.querySelector(".badge");

    expect(badge).to.exist;
    expect(badge?.innerHTML).to.equal("");
  });

  it("should conditionally renders icon in normal badge", async () => {
    const el = await fixture<TapBadge>(
      html`<tap-badge
        type="pill"
        leadingIcon
      ></tap-badge>`,
    );

    const badge = el.shadowRoot!.querySelector(".badge");

    expect(badge).to.exist;
    const icon = badge?.querySelector(".icon");

    expect(icon).to.exist;
  });

  it("should be accessible", async () => {
    const el = await fixture(html`<tap-badge label="Test Badge"></tap-badge>`);

    await expect(el).to.be.accessible();
  });
});
