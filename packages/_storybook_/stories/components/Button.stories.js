import { storiesOf } from "@storybook/vue";
import ZenButton from "@reciprocity/button";
import README from "../../../button/README.md";

import "../../styles/bootstrap.scss";

storiesOf("Components|Button", module)
  .addParameters({
    readme: {
      sidebar: README
    }
  })
  .add("default", () => ({
    components: { ZenButton },
    template: '<zen-button variant="primary">Test Button</zen-button>'
  }));
