/* eslint-disable eslint-comments/no-unlimited-disable, eslint-comments/disable-enable-pair */
/* eslint-disable */
// @ts-nocheck

import { expect, fixture } from "@open-wc/testing";
import { html } from "lit";
import sinon from "sinon";
import "../../dist/modal/index.js";
import { type TapsiModal } from "./index";

describe("tapsi-modal component", () => {
  it("should be hidden by default", async () => {
    const element = await fixture<TapsiModal>(
      html`<tapsi-modal .open=${false}></tapsi-modal>`,
    );

    expect(element.open).to.be.false;
  });

  it('should become visible when "open" is set to true', async () => {
    const element = await fixture<TapsiModal>(
      html`<tapsi-modal .open=${true}></tapsi-modal>`,
    );

    expect(element.open).to.be.true;
  });

  it('should dispatch an "open" event when show method is called', async () => {
    const element = await fixture<TapsiModal>(
      html`<tapsi-modal></tapsi-modal>`,
    );
    const openSpy = sinon.spy();
    const closeSpy = sinon.spy();

    element.addEventListener("open", openSpy);
    element.show();
    await element.updateComplete;
    expect(openSpy.calledOnce).to.be.true;
    expect(element.open).to.be.true;

    element.addEventListener("close", closeSpy);
    element.close();
    await element.updateComplete;
    expect(closeSpy.calledOnce).to.be.true;
    expect(element.open).to.be.false;
  });

  it("should close when clicking on the overlay", async () => {
    const element = await fixture<TapsiModal>(
      html`<tapsi-modal open></tapsi-modal>`,
    );
    const overlay = element.shadowRoot!.querySelector<HTMLElement>("#overlay");

    overlay?.click();
    await element.updateComplete;

    expect(element.open).to.be.false;
  });

  it("should close when pressing the Escape key", async () => {
    const element = await fixture<TapsiModal>(
      html`<tapsi-modal open></tapsi-modal>`,
    );

    const event = new KeyboardEvent("keydown", { key: "Escape" });

    element.dispatchEvent(event);
    await element.updateComplete;

    expect(element.open).to.be.false;
  });

  it("should render title and description correctly", async () => {
    const title = "Title";
    const description = "Description";
    const element = await fixture(
      html`<tapsi-modal
        open
        title=${title}
        description=${description}
      ></tapsi-modal>`,
    );

    const titleElement = element.shadowRoot!.querySelector(".title");
    const descriptionElement =
      element.shadowRoot!.querySelector(".description");

    expect(titleElement).to.exist;
    expect(titleElement?.textContent).to.equal(title);
    expect(descriptionElement).to.exist;
    expect(descriptionElement?.textContent?.trim()).to.equal(description);
  });
});
