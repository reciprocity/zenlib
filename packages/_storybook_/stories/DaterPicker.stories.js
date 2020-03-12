import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import DatePicker from "@reciprocity/date-picker";
import README from "../../date-picker/README.md";

storiesOf("DatePicker", module)
  .addParameters({
    readme: {
      sidebar: README
    }
  })
  .add("basic", () => ({
    data() {
      return {
        time: null
      };
    },
    components: { DatePicker },
    template:
      '<date-picker :value="time" valueType="format" @input="handleInput"/>',
    methods: {
      handleInput(time) {
        this.time = time;
        action("input");
      }
    }
  }))
  .add("datetime", () => ({
    data() {
      return {
        time: null
      };
    },
    components: { DatePicker },
    template: '<date-picker v-model="time" type="datetime"/>'
  }))
  .add("range", () => ({
    data() {
      return {
        time: null,
        lang: {
          monthFormat: "MMM"
        }
      };
    },
    components: { DatePicker },
    template: '<date-picker v-model="time" range :lang="lang">'
  }))
  .add("slots", () => ({
    data() {
      return {
        time: null
      };
    },
    components: { DatePicker },
    template: `<date-picker v-model="time" valueType="format">
        <template v-slot:header> <span> Custom header </span></template>
        </date-picker>`
  }));
