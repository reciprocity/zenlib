import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import ColorPicker from "@reciprocity/color-picker";

storiesOf("ColorPicker", module).add("default", () => ({
  data() {
    return {
      color: "#0099FF"
    };
  },
  components: { ColorPicker },
  template:
    "<color-picker :value='color' :showColorInput='true' :showSaveButton='true' @input='change' />",
  methods: {
    change(color) {
      this.color = color;
      action("input");
    }
  }
}));
