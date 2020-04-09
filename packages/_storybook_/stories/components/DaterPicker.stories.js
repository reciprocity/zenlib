import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import DatePicker from "@reciprocity/date-picker";
import README from "../../../date-picker/README.md";

storiesOf("Components|DatePicker", module)
  .addParameters({
    readme: {
      sidebar: README
    }
  })
  .add("basic", () => ({
    data() {
      return {
        time: "1984-07-06"
      };
    },
    components: { DatePicker },
    template: `<div>
        <date-picker :value="time" @input="handleInput" :clearable="false" />
        <span>Selected date value: {{time}}</span>
      </div>`,
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
        time: null,
        format: "DD MMM YYYY - HH:mm:ss"
      };
    },
    components: { DatePicker },
    template: `<div>
    <date-picker v-model="time" valueType="date" type="datetime" :format="format" :altInput="false"/>
    <div>Selected date value: {{time}}</div>
  </div>`
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
    template:
      '<date-picker v-model="time" range :lang="lang" valueType="timestamp"/>'
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
  }))
  .add("disabled", () => ({
    data() {
      return {
        time: null
      };
    },
    components: { DatePicker },
    template: `<div>
        <date-picker v-model="time" :clearable="false" inline :disabled-date="disabledDate"/>
      </div>`,
    methods: {
      disabledDate(date) {
        const refDate = new Date();
        refDate.setDate(refDate.getDate() - 2);
        return date < refDate;
      }
    }
  }))
  .add("shortcuts", () => ({
    data() {
      return {
        time: null,
        shortcuts: [
          {
            text: "First shortcut",
            onClick: () => {}
          },
          {
            text: "Second shortcut",
            onClick: () => {}
          },
          {
            text: "Super long name shortcut",
            onClick: () => {}
          }
        ]
      };
    },
    components: { DatePicker },
    template: `<div>
        <date-picker v-model="time" :shortcuts="shortcuts" />
      </div>`,
    methods: {
      disabledDate(date) {
        const refDate = new Date();
        refDate.setDate(refDate.getDate() - 2);
        return date < refDate;
      }
    }
  }))
  .add("confirm button", () => ({
    data() {
      return {
        time: null
      };
    },
    components: { DatePicker },
    template: `<div>
        <date-picker v-model="time" confirm confirm-text="Apply" inline />
      </div>`,
    methods: {
      disabledDate(date) {
        const refDate = new Date();
        refDate.setDate(refDate.getDate() - 2);
        return date < refDate;
      }
    }
  }));
