import Vue from "vue";
import vueCustomElement from "vue-custom-element";

import ZenMultiselect from "./Multiselect.vue";

// Configure Vue to ignore the element name when defined outside of Vue.
Vue.config.ignoredElements = ["zen-multiselect"];

// Enable the plugin
Vue.use(vueCustomElement);

// Register your component
Vue.customElement("zen-multiselect", ZenMultiselect, {
  // Additional Options: https://github.com/karol-f/vue-custom-element#options
});
