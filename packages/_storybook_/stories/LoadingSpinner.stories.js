import { storiesOf } from "@storybook/vue";
import LoadingSpinner from "@reciprocity/loading-spinner";

storiesOf("LoadingSpinner", module).add("default", () => ({
  components: { LoadingSpinner },
  template: "<loading-spinner></loading-spinner>"
}));
