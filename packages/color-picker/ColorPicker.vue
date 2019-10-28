<template>
  <div :style="colorCircleStyle" :class="colorCircleClass">
    <div ref="colorCircle" class="clickable-area" />
  </div>
</template>

<script>
import Vue from "vue";
import Pickr from "@simonwep/pickr";

import "@simonwep/pickr/dist/themes/classic.min.css";

const isValidColor = hexColor => /^#[0-9A-Fa-f]{6}$/i.test(hexColor);

export default Vue.extend({
  name: "ColorPicker",
  props: {
    value: {
      type: String,
      required: true
    },
    showColorInput: {
      type: Boolean,
      default: false
    },
    showSaveButton: {
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
          input: this.showColorInput,
          clear: false,
          save: this.showSaveButton
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

.color-circle {
  border: $border-width solid $color-ghost;
  border-radius: 50%;
  flex: none;
  height: $circle-size;
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

<style lang="scss">
@import "@reciprocity/bootstrap/scss/variables";
@import "@reciprocity/bootstrap/scss/custom";

.pcr-app[data-theme="classic"] {
  max-width: 235px;
}
.pcr-app[data-theme="classic"] {
  .pcr-interaction {
    .pcr-result {
      border: 1px solid $gray-400;
      color: $gray-700;
      background: $color-white;
      border-radius: $border-radius-sm;
      font-size: $font-size-sm;
      font-family: $font-family-base;
      padding: $input-padding-x-sm;
      &:hover {
        filter: none;
      }
      &:focus {
        border-color: $input-focus-border-color;
        box-shadow: 0 0 0 0.2rem rgba($color-app-primary, 0.25);
      }
    }
    .pcr-save {
      padding: $input-btn-padding-y-sm $input-btn-padding-x-sm;
      border-radius: $border-radius;
      background-color: $color-app-primary;
      border: 1px solid $color-app-primary;
      font-size: $font-size-sm;
      transition: none;
      font-family: $font-family-base;
      letter-spacing: 0;
      &:hover {
        filter: none;
        background-color: darken($color-app-primary, 7.5%);
      }
      &:focus {
        border-color: $input-focus-border-color;
        background-color: darken($color-app-primary, 7.5%);
        box-shadow: 0 0 0 0.2rem rgba($color-app-primary, 0.25);
      }
    }
  }
}
</style>
