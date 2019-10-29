import { storiesOf } from "@storybook/vue";
import ZenButton from "@reciprocity/button";
import README from "../../button/README.md";

import "../styles/bootstrap.scss";

storiesOf("Button", module)
  .addParameters({
    readme: {
      sidebar: README
    }
  })
  .add("default", () => ({
    components: { ZenButton },
    template: '<zen-button variant="outline-primary">Test Button</zen-button>'
  }));
