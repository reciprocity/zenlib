<template>
  <div class="d-flex align-items-center">
    <b-form-input
      :value="value"
      :required="required"
      pattern="#[0-9A-Fa-f]{6}"
      @input="onColorTextChange"
    />
    <div :style="colorCircleStyle" :class="colorCircleClass">
      <div ref="colorCircle" class="clickable-area" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Pickr from "@simonwep/pickr";
import { BFormInput } from "bootstrap-vue";

import "@simonwep/pickr/dist/themes/classic.min.css";

const isValidColor = hexColor => /^#[0-9A-Fa-f]{6}$/i.test(hexColor);

export default Vue.extend({
  name: "ColorInput",
  components: {
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
  data() {
    return {
      pickr: null
    };
  },
  computed: {
    colorCircleClass() {
      return ["color-circle", { "is-invalid": !this.valid }];
    },
    colorCircleStyle() {
      return this.valid ? `background-color:${this.value}` : "";
    },
    valid() {
      return isValidColor(this.value);
    }
  },
  watch: {
    value: {
      handler(color) {
        const current = this.pickr
          .getColor()
          .toHEXA()
          .toString();
        if (color !== current && isValidColor(color)) {
          this.setPickrColor(color);
        }
      }
    }
  },
  mounted() {
    this.pickr = Pickr.create({
      el: this.$refs.colorCircle,
      default: this.value,
      useAsButton: true,
      components: {
        preview: false,
        opacity: false,
        hue: true,
        interaction: {
          hex: false,
          rgba: false,
          hsla: false,
          hsva: false,
          cmyk: false,
          input: false,
          clear: false,
          save: false
        }
      }
    });
    this.pickr.on("change", newColor => {
      this.onPickrColorChange(newColor.toHEXA().toString());
    });
  },
  beforeDestroy() {
    this.pickr.destroy();
  },
  methods: {
    onColorTextChange(color) {
      this.setPickrColor(color);
    },
    onPickrColorChange(color) {
      this.$emit("input", color);
    },
    setPickrColor(color) {
      this.pickr.setColor(color);
      this.onPickrColorChange(color);
    }
  }
});
</script>

<style lang="scss" scoped>
@import "@reciprocity/bootstrap/scss/colors";
@import "@reciprocity/bootstrap/scss/variables";

$border-width: 1px;
$circle-size: 25px;

.form-control {
  max-width: 175px;
}

.color-circle {
  border: $border-width solid $color-ghost;
  border-radius: 50%;
  flex: none;
  height: $circle-size;
  margin-left: 15px;
  position: relative;
  width: $circle-size;

  &.is-invalid::after {
    content: "×";
    color: $color-error;
    font-size: 17px;
    line-height: $circle-size - 2 * $border-width;
    pointer-events: none;
    position: absolute;
    text-align: center;
    top: 0;
    width: $circle-size - 2 * $border-width;
  }
}

.clickable-area {
  cursor: pointer;
  height: 100%;
  width: 100%;
}
</style>
