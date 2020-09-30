import { storiesOf } from "@storybook/vue";
import FileDropzone from "@reciprocity/file-dropzone";
import README from "../../../file-dropzone/README.md";

storiesOf("Components|FileDropzone", module)
  .addParameters({
    readme: {
      sidebar: README
    }
  })
  .add("default", () => ({
    components: { FileDropzone },
    template: '<file-dropzone class="blocks" style="height: 200px"/>'
  }))
  .add("inlined", () => ({
    components: { FileDropzone },
    template: "<file-dropzone/>"
  }));
