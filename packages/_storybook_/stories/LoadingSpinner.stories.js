import { storiesOf } from "@storybook/vue";
import LoadingSpinner from "@reciprocity/loading-spinner";
import README from "../../loading-spinner/README.md";

storiesOf("LoadingSpinner", module)
  .addParameters({
    readme: {
      sidebar: README
    }
  })
  .add("default", () => ({
    components: { LoadingSpinner },
    template: "<loading-spinner></loading-spinner>"
  }));
