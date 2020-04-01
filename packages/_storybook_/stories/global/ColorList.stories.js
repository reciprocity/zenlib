import { storiesOf } from "@storybook/vue";
import ColorList from "./ColorList.vue";

import README_BOOTSTRAP from "../../../_bootstrap_/README.md";
import README_CUSTOM from "../../../_custom_/README.md";

import bootstrapColors from "../../../_bootstrap_/scss/colors.scss";
import customColors from "../../../_custom_/scss/colors.scss";

const scaleName = color => {
  const array = color.split("-")[0].split(/(?=[A-Z])/);
  return `${array.join(" ")}`;
};

const colorVariable = color => {
  const array = color.split("-").splice(1);
  return `$${array
    .join("-")
    .split(":")[0]
    .toLowerCase()}`;
};

const mapColors = colors => {
  return Object.keys(colors).reduce((acc, color) => {
    const group = scaleName(color);
    if (!acc[group]) acc[group] = [];
    acc[group].push({
      variable: colorVariable(color),
      value: colors[color]
    });
    return acc;
  }, {});
};

storiesOf("Global|Custom Colors", module)
  .addParameters({
    readme: {
      sidebar: README_CUSTOM
    }
  })
  .add("list", () => ({
    data() {
      return {
        colors: mapColors(customColors)
      };
    },
    components: { ColorList },
    template: `<ColorList :colors="colors" />`
  }));

storiesOf("Global|Bootstrap colors", module)
  .addParameters({
    readme: {
      sidebar: README_BOOTSTRAP
    }
  })
  .add("list", () => ({
    data() {
      return {
        colors: mapColors(bootstrapColors)
      };
    },
    components: { ColorList },
    template: `<ColorList :colors="colors" />`
  }));
