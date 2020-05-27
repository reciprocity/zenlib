import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import Multiselect from "@reciprocity/multiselect";
import VueMultiselect from "../../node_modules/vue-multiselect";
import README from "../../../multiselect/README.md";

storiesOf("Components|Multiselect", module)
  .addParameters({
    readme: {
      sidebar: README
    }
  })
  .add("Vue-multiselect", () => ({
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
    components: { VueMultiselect },
    template:
      "<vue-multiselect v-model='value' :options='options' @input='change' style='max-width: 700px;' />",
    methods: {
      change: action("input")
    }
  }))
  .add("Single", () => ({
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
      "<multiselect v-model='value' :options='options' @input='change' style='max-width: 700px;' />",
    methods: {
      change: action("input")
    }
  }))
  .add("Multiple", () => ({
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
      "<multiselect placeholder='some very long placeholder' v-model='value' :options='options' @input='change' multiple :close-on-select='false' style='max-width: 700px;' />",
    methods: {
      change: action("input")
    }
  }));
