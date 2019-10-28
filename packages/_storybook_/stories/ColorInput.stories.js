import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import ColorInput from "@reciprocity/color-input";

storiesOf("ColorInput", module).add("default", () => ({
  data() {
    return {
      color: "#0099FF"
    };
  },
  components: { ColorInput },
  template: "<color-input :value='color' @input='change' />",
  methods: {
    change(color) {
      this.color = color;
      action("input");
    }
  }
}));
