import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import Multiselect from "@reciprocity/multiselect";
import README from "../../../multiselect/README.md";

storiesOf("Components|Multiselect", module)
  .addParameters({
    readme: {
      sidebar: README
    }
  })
  .add("single", () => ({
    data() {
      return {
        value: null,
        options: ["Argentina", "Slovenia", "United States"]
      };
    },
    components: { Multiselect },
    template:
      "<multiselect v-model='value' :options='options' @input='change' />",
    methods: {
      change: action("input")
    }
  }))
  .add("multiple", () => ({
    data() {
      return {
        value: null,
        options: ["Argentina", "Slovenia", "United States"]
      };
    },
    components: { Multiselect },
    template:
      "<multiselect v-model='value' :options='options' @input='change' multiple />",
    methods: {
      change: action("input")
    }
  }))
  .add("multiple improved", () => ({
    data() {
      return {
        value: null,
        options: [
          "Argentina",
          "Slovenia",
          "United States",
          "China",
          "Some very long country name that never existed plus some more"
        ]
      };
    },
    components: { Multiselect },
    template:
      "<div class='multiselect_improvements' style='max-width: 400px;'><multiselect v-model='value' :options='options' @input='change' multiple :close-on-select='false' /></div>",
    methods: {
      change: action("input")
    }
  }));
