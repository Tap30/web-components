import { html, TemplateResult } from 'lit';
import './index.js';

export default {
  title: 'PinInput',
  component: 'tap-pin-input',
  argTypes: {},
};

interface Story<T> {
  (args: T): TemplateResult;

  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {}

const Template: Story<ArgTypes> = (/*{}: ArgTypes*/) => html`
  <tap-pin-input
    title="عنوان"
    description="توضیحات"
    @input-filled=${(e: Error) => console.log(e)}
  ></tap-pin-input>
`;

export const PinInput = Template.bind({});

PinInput.args = {};
const TemplateWithForm: Story<ArgTypes> = (/*{}: ArgTypes*/) => html`
  <form
    @submit=${(e, b) => {
      console.log({ e, b });
      e.preventDefault();
    }}
    @formdata=${(e, b) => {
      console.log({ e, b });
      e.preventDefault();
    }}
  >
    <tap-pin-input
      title="عنوان"
      description="توضیحات"
      @input-filled=${(e: Error) => console.log(e)}
    ></tap-pin-input>
    <button type="submit">Submit</button>
  </form>
`;

export const PinInputWithForm = TemplateWithForm.bind({});
