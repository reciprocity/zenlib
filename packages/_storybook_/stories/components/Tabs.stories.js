import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import Tabs from "@reciprocity/tabs";
import README from "../../../tabs/README.md";

storiesOf("Components|Tabs", module)
  .addParameters({
    readme: {
      sidebar: README
    }
  })
  .add("single", () => ({
    data() {
      return {
        value: null,
        newItem: "My item",
        items: [
          { label: "United States with a long title" },
          { label: "Argentina" },
          { label: "Slovenia" }
        ]
      };
    },
    components: { Tabs },
    methods: {
      removeClicked: function(data) {
        this.items.splice(data.index, 1);
        action("removeClicked")(data);
      },
      addItem: function() {
        this.items.push({ label: this.newItem });
      }
    },
    template: `
      <div>
        <div style="background-color: #fff; padding: 0; margin-bottom: 0.25rem; max-width: 350px;">
          <tabs v-model='value' :items='items' @removeClicked="removeClicked" />
        </div>
        <input v-model="newItem"/>
        <button @click="addItem">Add item</button>
      </div>`
  }));
