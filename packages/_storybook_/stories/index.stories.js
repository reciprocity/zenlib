/* eslint-disable react/react-in-jsx-scope */
import { storiesOf } from '@storybook/vue';
import ZenButton from '@reciprocity/button';

import '../styles/bootstrap.scss';

const withPadding = () => {
  return {
    template: '<div style="padding: 1rem;"><story/></div>',
  };
};

storiesOf('Button', module)
  .addDecorator(withPadding)
  .add('default', () => ({
    components: { ZenButton },
    template: '<zen-button variant="outline-primary">Test Button</zen-button>'
  }));
