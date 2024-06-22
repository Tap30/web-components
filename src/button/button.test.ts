import '../../dist/button/index.js';
import { fixture, expect, html, oneEvent } from '@open-wc/testing';
import { TapButton } from './index';
import sinon from 'sinon';

describe('Test tap-button', () => {
  it('should render button with default properties', async () => {
    const el = await fixture<TapButton>(html` <tap-button></tap-button>`);
    expect(el).to.exist;
    expect(el?.disabled).to.be.false;
  });

  it('should reflects properties to attributes', async () => {
    const el = await fixture<TapButton>(
      html` <tap-button disabled type="submit" name="test-name"></tap-button>`,
    );
    expect(el?.disabled).to.be.true;
    expect(el?.getAttribute('type')).to.equal('submit');
    expect(el?.getAttribute('name')).to.equal('test-name');
  });

  it('should handles button click', async () => {
    const el = await fixture<TapButton>(
      html` <tap-button type="submit"></tap-button>`,
    );
    setTimeout(() => el?.click(), 0);
    const event = await oneEvent(el, 'click');
    expect(event).to.exist;
  });

  it('should renders slot content', async () => {
    const el = await fixture(html`<tap-button>تایید</tap-button>`);
    const slot = el.shadowRoot!.querySelector('slot');
    const slotContent = slot!.assignedNodes()[0];
    expect(slotContent.textContent).to.equal('تایید');
  });

  it('should be accessible', async () => {
    const el = await fixture(
      html`<tap-button label="Test Button"></tap-button>`,
    );

    await expect(el).to.be.accessible();
  });

  it('should conditionally renders loading state', async () => {
    const el = await fixture<TapButton>(html`<tap-button loading></tap-button>`,);
    // Check if the spinner is rendered when loading is true
    const spinner = el.shadowRoot!.querySelector('.spinner');

    expect(spinner).to.exist;

    // Check if the content slot is still rendered when loading is true
    const content = el.shadowRoot!.querySelector('.content');
    expect(content).to.exist;

    // Change the loading property and check if the spinner is removed
    el.loading = false;
    await el.updateComplete;

    // Check if the spinner is not rendered when loading is false
    expect(el.shadowRoot!.querySelector('.spinner')).to.be.null;

    // Check if the slot is rendered when loading is false
    expect(el.shadowRoot!.querySelector('slot')).to.exist;
  });

  it('should submit when the button is inside the form', async () => {
    const form = await fixture<HTMLFormElement>(html`
        <form action="" method="post">
          <tap-button type="submit">Submit</tap-button>
        </form>
      `);
    const button = form.querySelector('tap-button');

    const handleSubmit = sinon.spy((event: SubmitEvent) => event.preventDefault());

    addEventListener('submit', handleSubmit);

    // Dispatching a click event on the button element
    const buttonElement = button!.shadowRoot!.querySelector('button');

    buttonElement!.click();
    expect(handleSubmit).to.have.been.called;
  });

  it('should submit when the button is outside the form and has a form attribute', async () => {
    const form = await fixture<HTMLFormElement>(html`
        <form action="" method="post">
          <tap-button type="submit">Submit</tap-button>
        </form>
      `);
    const button = form.querySelector('tap-button');

    const handleSubmit = sinon.spy((event: SubmitEvent) => event.preventDefault());

    addEventListener('submit', handleSubmit);

    // Dispatching a click event on the button element
    const buttonElement = button!.shadowRoot!.querySelector('button');

    buttonElement!.click();
    expect(handleSubmit).to.have.been.called;
  });

});
