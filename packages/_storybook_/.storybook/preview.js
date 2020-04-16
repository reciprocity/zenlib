import { addDecorator, addParameters } from '@storybook/vue';
import { addReadme } from 'storybook-readme/vue';
import { themes, create } from '@storybook/theming';

const basicTheme = create({
  base: 'light',
  brandTitle: 'Storybook'
});

addParameters({
  options: {
    showPanel: true,
    panelPosition: 'bottom',
    theme: basicTheme
  }
});

const withPadding = () => {
  return {
    template: '<div style="padding: 1rem;"><story/></div>'
  };
};

addDecorator(withPadding);
addDecorator(addReadme);
