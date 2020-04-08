import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import DaySelector from "@reciprocity/day-selector";
import README from "../../../day-selector/README.md";

storiesOf("Components|DaySelector", module)
  .addParameters({
    readme: {
      sidebar: README
    }
  })
  .add("default", () => ({
    components: { DaySelector },
    template: "<day-selector :value='[]' @input='action'></day-selector>",
    methods: { action: action("input") }
  }));
