import { storiesOf } from "@storybook/vue";
import DatePicker from "@reciprocity/date-picker";
import README from "../../date-picker/README.md";

storiesOf("DatePicker", module)
  .addParameters({
    readme: {
      sidebar: README
    }
  })
  .add("default", () => ({
    components: { DatePicker },
    template: "<date-picker />"
  }));
