import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import DropdownMultiselect from "@reciprocity/dropdown-multiselect";
import README from "../../dropdown-multiselect/README.md";

storiesOf("DropdownMultiselect", module)
  .addParameters({
    readme: {
      sidebar: README
    }
  })
  .add("default", () => ({
    data() {
      return {
        value: [],
        options: [
          { label: "Open", value: 1 },
          { label: "Submitted", value: 2 },
          { label: "Reviewed", value: 3 },
          { label: "Completed", value: 4 }
        ],
        placeholder: "Statuses"
      };
    },
    components: { DropdownMultiselect },
    template:
      "<dropdown-multiselect v-model='value' :options='options' :placeholder='placeholder' @input='change' />",
    methods: {
      change: action("input")
    }
  }));
