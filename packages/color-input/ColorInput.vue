<template>
  <div class="d-flex align-items-center">
    <b-form-input
      :value="value"
      :required="required"
      pattern="#[0-9A-Fa-f]{6}"
      @input="$emit('input', value)"
    />
    <color-picker v-model="value" />
  </div>
</template>

<script>
import Vue from "vue";
import ColorPicker from "../color-picker";
import { BFormInput } from "bootstrap-vue";

export default Vue.extend({
  name: "ColorInput",
  components: {
    ColorPicker,
    BFormInput
  },
  props: {
    value: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    }
  }
});
</script>

<style lang="scss" scoped>
.form-control {
  max-width: 175px;
  margin-right: 15px;
}
</style>
