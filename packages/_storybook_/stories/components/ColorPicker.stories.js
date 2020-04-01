import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import ColorPicker from "@reciprocity/color-picker";
import README from "../../../color-picker/README.md";

storiesOf("Components|ColorPicker", module)
  .addParameters({
    readme: {
      sidebar: README
    }
  })
  .add("default", () => ({
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
