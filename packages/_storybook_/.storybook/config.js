import { configure, addDecorator, addParameters } from '@storybook/vue';
import { addReadme } from 'storybook-readme/vue';

const withPadding = () => {
  return {
    template: '<div style="padding: 1rem;"><story/></div>'
  };
};

addDecorator(withPadding);
addDecorator(addReadme);

addParameters({
  options: {
    showPanel: true,
    panelPosition: 'right'
  }
});

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
