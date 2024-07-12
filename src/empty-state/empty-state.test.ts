import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit';
import { TapEmptyState } from '.';
import sinon from 'sinon';

describe('tap-empty-state component', () => {
  it('should render title', async () => {
    const element = await fixture<TapEmptyState>(
      html`<tap-empty-state
        title="عنوان"
        description="توضیح"
      ></tap-empty-state>`,
    );
    const title = element.getAttribute('title');
    const description = element.getAttribute('description');

    expect(title).to.exist;
    expect(title).to.equal('عنوان');
    expect(description).to.exist;
    expect(description).to.equal('توضیح');
  });

  it('should not render title and description when not provided', async () => {
    const element = await fixture<TapEmptyState>(
      html`<tap-empty-state></tap-empty-state>`,
    );
    const title = element.getAttribute('title');
    const description = element.getAttribute('description');

    expect(title).not.to.exist;
    expect(description).not.to.exist;
  });

  it('should render slot', async () => {
    const element = await fixture<TapEmptyState>(
      html`<tap-empty-state
        ><tap-button slot="actions">کپی لینک دعوت</tap-button></tap-empty-state
      >`,
    );
    const slotContent = element.querySelector('[slot="actions"]');

    expect(slotContent).to.exist;
    expect(slotContent?.textContent).to.include('کپی لینک دعوت');
  });

  it('should trigger a click event on a button placed in the actions slot', async () => {
    const element = await fixture<TapEmptyState>(
      html`<tap-empty-state
        ><tap-button slot="actions">copy</tap-button></tap-empty-state
      >`,
    );
    const button = element.querySelector('tap-button');

    const clickSpy = sinon.spy();
    addEventListener('click', clickSpy);
    button?.click();

    expect(clickSpy.called).to.be.true;
  });
});
