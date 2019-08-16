import { storiesOf } from "@storybook/vue";
import ZenButton from "@reciprocity/button";

import "../styles/bootstrap.scss";

storiesOf("Button", module).add("default", () => ({
  components: { ZenButton },
  template: '<zen-button variant="outline-primary">Test Button</zen-button>'
}));
