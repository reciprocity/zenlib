import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import DaySelector from "@reciprocity/day-selector";

storiesOf("DaySelector", module).add("default", () => ({
  components: { DaySelector },
  template: "<day-selector :value='[]' @input='action'></day-selector>",
  methods: { action: action("input") }
}));
