import { storiesOf } from "@storybook/vue";
import ColorList from "./ColorList.vue";
import README from "./README.md";
import { mergePalettes } from "./helper";

import bootstrapColors from "../../../../_bootstrap_/scss/colors.scss";
import customColors from "../../../../_styles_/scss/colors.scss";

storiesOf("Global|Colors", module)
  .addParameters({
    readme: {
      sidebar: README
    }
  })
  .add("list", () => ({
    data() {
      return {
        colors: mergePalettes(bootstrapColors, customColors)
      };
    },
    components: { ColorList },
    template: `<ColorList :colors="colors" />`
  }));
