import '../../dist/pinwheel/index.js';
import {fixture, expect, html, elementUpdated, fixtureCleanup} from '@open-wc/testing';
import { TapPinwheel } from './index';

describe('test tap-pinwheel', () => {
  afterEach(() => {
    fixtureCleanup();
  });

  it('should render pinwheel with default properties', async () => {
    const el = await fixture<TapPinwheel>(html` <tap-pinwheel></tap-pinwheel>`);
    expect(el).to.exist;
    expect(el?.items).to.deep.equal([]);
  });

  it('should reflects properties to attributes', async () => {
    const items = ['item1', 'item2'];
    const el = await fixture<TapPinwheel>(
      html`<tap-pinwheel .items=${items}></tap-pinwheel>`,
    );
    expect(el?.items).to.deep.equal(items);
  });

  it('should set first item as active item', async () => {
    const items = ['item1', 'item2'];
    const el = await fixture<TapPinwheel>(
      html`<tap-pinwheel .items=${items}></tap-pinwheel>`,
    );
    const firstItem =  el.shadowRoot?.querySelector('.pinwheel')?.children?.[0];
    expect(firstItem?.className).to.contain('active')
  });

  it('should set prev/next item as active item on click event', async () => {
    const items = ['item1', 'item2', 'items3', 'item4', 'item5'];

    const el = await fixture<TapPinwheel>(
      html`<tap-pinwheel .items=${items}></tap-pinwheel>`,
    );

    const itemNodes =  el.shadowRoot?.querySelector('.pinwheel')?.children;
    const firstItem = itemNodes?.[0];
    const secondItem = itemNodes?.[1];

    (<HTMLDivElement>secondItem)?.click();
    await elementUpdated(el);
    expect(firstItem?.className).not.to.contain('active');
    expect(secondItem?.className).to.contain('active');


    (<HTMLDivElement>firstItem)?.click();
    await elementUpdated(el);
    expect(firstItem?.className).to.contain('active');
    expect(secondItem?.className).not.to.contain('active');
  });

  it('should be accessible', async () => {
    const items = ['item1', 'item2', 'items3', 'item4', 'item5'];

    const el = await fixture<TapPinwheel>(
      html`<tap-pinwheel .items=${items}></tap-pinwheel>`,
    );

    await expect(el).to.be.accessible();
  });

  // TODO write test for scroll interaction and pinwheel-change event
});
