<template>
  <div class="d-flex align-items-center">
    <b-form-input
      v-model="color"
      :required="required"
      pattern="#[0-9A-Fa-f]{6}"
    />
    <color-picker v-model="color" />
  </div>
</template>

<script>
import ColorPicker from "@reciprocity/color-picker";
import { BFormInput } from "bootstrap-vue";

export default {
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
  },
  computed: {
    color: {
      get: function() {
        return this.value;
      },
      set: function(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.form-control {
  max-width: 175px;
  margin-right: 15px;
}
</style>
