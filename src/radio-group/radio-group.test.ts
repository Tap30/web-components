import "../../dist/radio-group/index.js";
import "../../dist/radio/index.js";

import { expect, fixture, html } from "@open-wc/testing";
import { type RadioGroup } from "./radio-group.js";

describe("tap-radio-group component", () => {
  const value = "2";

  it("should select the correct radio button based on the initial value", async () => {
    const element = await fixture<RadioGroup>(html`
      <tap-radio-group value=${value}>
        <tap-radio value="1"></tap-radio>
        <tap-radio value="2"></tap-radio>
        <tap-radio value="3"></tap-radio>
      </tap-radio-group>
    `);

    const radios = element.radios;

    expect(radios.length).to.equal(3);
    expect(radios.find(radio => radio.value === value)?.checked).to.be.true;
  });

  it("should select a radio button when a nested element is passed", async () => {
    const rootElement = await fixture<RadioGroup>(html`
      <tap-radio-group value="2">
        <div>
          <tap-radio value="1"></tap-radio>
        </div>
        <div>
          <tap-radio value="2"></tap-radio>
        </div>
        <div>
          <tap-radio value="3"></tap-radio>
        </div>
      </tap-radio-group>
    `);

    const slot = rootElement.shadowRoot?.querySelector("slot");
    const elements = slot!.assignedElements({ flatten: true });

    // TODO: use the element.radios
    const radios = elements.flatMap(element => {
      if (element.nodeType === Node.ELEMENT_NODE) {
        const el = element as HTMLElement;
        const foundRadios = Array.from(
          el.querySelectorAll<HTMLInputElement>("tap-radio"),
        );

        return foundRadios;
      }

      return [];
    });

    expect(radios.length).to.equal(3);
    expect(radios.find(radio => radio.value === value)?.value).to.equal(value);
  });

  it("should handle radio buttons nested inside other elements", async () => {
    const rootElement = await fixture<RadioGroup>(html`
      <tap-radio-group value=${value}>
        <tap-row>
          <div slot="leading"><tap-radio value="1"></tap-radio></div>
          <div slot="content"><span>Label 1</span></div>
        </tap-row>
        <tap-row>
          <div slot="content">
            <tap-radio value="2"></tap-radio>
            <span>Label 2</span>
          </div>
        </tap-row>
        <tap-row>
          <div slot="content">
            <tap-radio value="3"></tap-radio>
            <span>Label 3</span>
          </div>
        </tap-row>
      </tap-radio-group>
    `);

    const slot = rootElement.shadowRoot?.querySelector("slot");
    const elements = slot!.assignedElements({ flatten: true });

    // TODO: use the element.radios
    const radios = elements.flatMap(element => {
      if (element.nodeType === Node.ELEMENT_NODE) {
        const el = element as HTMLElement;
        const foundRadios = Array.from(
          el.querySelectorAll<HTMLInputElement>("tap-radio"),
        );

        return foundRadios;
      }

      return [];
    });

    expect(radios.length).to.equal(3);
    expect(radios.find(radio => radio.value === value)?.value).to.equal(value);
  });
});
