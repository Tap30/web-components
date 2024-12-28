/* eslint-disable eslint-comments/no-unlimited-disable, eslint-comments/disable-enable-pair */
/* eslint-disable */
// @ts-nocheck

import { expect, fixture } from "@open-wc/testing";
import { html } from "lit";
import sinon from "sinon";
import "../../dist/empty-state/index.js";
import { type TapsiEmptyState } from "./index.js";

describe("tapsi-empty-state component", () => {
  it("should render title", async () => {
    const title = "عنوان";
    const description = "توضیح";
    const element = await fixture<TapsiEmptyState>(
      html`<tapsi-empty-state
        title=${title}
        description=${description}
      ></tapsi-empty-state>`,
    );

    const titleElement = element.shadowRoot!.querySelector(".title");
    const descriptionElement =
      element.shadowRoot!.querySelector(".description");

    expect(titleElement).to.exist;
    expect(titleElement).to.equal(title);
    expect(descriptionElement).to.exist;
    expect(descriptionElement).to.equal(description);
  });

  it("should not render title and description when not provided", async () => {
    const element = await fixture<TapsiEmptyState>(
      html`<tapsi-empty-state></tapsi-empty-state>`,
    );

    const titleElement = element.shadowRoot!.querySelector(".title");
    const descriptionElement =
      element.shadowRoot!.querySelector(".description");

    expect(titleElement).not.to.exist;
    expect(descriptionElement).not.to.exist;
  });

  it("should render slot", async () => {
    const element = await fixture<TapsiEmptyState>(
      html`<tapsi-empty-state
        ><tapsi-button slot="actions"
          >کپی لینک دعوت</tapsi-button
        ></tapsi-empty-state
      >`,
    );

    const slotContent = element.shadowRoot!.querySelector('[slot="actions"]');

    expect(slotContent).to.exist;
    expect(slotContent?.textContent).to.include("کپی لینک دعوت");
  });

  it("should trigger a click event on a button placed in the actions slot", async () => {
    const element = await fixture<TapsiEmptyState>(
      html`<tapsi-empty-state
        ><tapsi-button slot="actions">copy</tapsi-button></tapsi-empty-state
      >`,
    );

    const button =
      element.shadowRoot!.querySelector<HTMLElement>("tapsi-button");
    const clickSpy = sinon.spy();

    addEventListener("click", clickSpy);

    button?.click();

    expect(clickSpy.called).to.be.true;
  });
});
