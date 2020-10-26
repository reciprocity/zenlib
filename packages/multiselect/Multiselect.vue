<template>
  <div
    v-resize="onResize"
    class="multiselect-wrapper"
    :class="{
      'calculating-limit': calculatingLimit,
      multiple: multiple
    }"
  >
    <vue-multiselect
      :name="name"
      :multiple="multiple"
      :search-in-dropdown="multiple"
      :disabled="disabled"
      :class="validationClass"
      :options="myOptions"
      :option-height="35"
      :value="value_c"
      :allow-empty="allowEmpty"
      :show-labels="false"
      :label="label"
      :custom-label="customLabel"
      :limit="myLimit"
      v-bind="attrs"
      v-on="$listeners"
      @input="onChange"
      @open="onOpen"
      @close="onClose"
    >
      <!--
        TODO: clean up when this is merged:
        https://github.com/vuejs/vue/pull/7765
      -->
      <template
        v-for="(slot, slotName) in $scopedSlots"
        :slot="slotName"
        slot-scope="props"
      >
        <slot v-bind="props" :name="slotName" />
      </template>

      <template v-if="multiple" slot="limit">
        <span class="multiselect__tag multiselect__limit-pill">
          <span>+{{ (value_c || []).length - myLimit }}</span>
        </span>
      </template>

      <template v-if="multiple" slot="beforeList">
        <span
          class="multiselect__action multiselect__option"
          :class="{ disabled: !isValueSet }"
          @click="clearSelectedValue"
          ><small>Clear selection</small></span
        >
      </template>

      <template
        v-if="checkboxesVisible"
        :slot="checkboxesVisible ? 'option' : ''"
        slot-scope="props"
      >
        <div class="checkbox_parent">
          <input
            type="checkbox"
            class="multiselect__checkbox"
            :checked="isSelected(props.option)"
          />
          <span>
            {{ getOptionLabel(props.option) }}
          </span>
        </div>
      </template>

      <template v-slot:clear>
        <!-- Render hidden select element for form posting -->
        <select
          v-if="renderSelectElement"
          :multiple="multiple"
          :name="name"
          class="d-none"
        >
          <option
            v-for="option in valueArray"
            :key="option ? option.value : null"
            :value="option ? option.value : null"
            selected
            >{{ option ? option.label : null }}</option
          >
        </select>

        <div
          v-show="isValueSet && allowEmpty && !disabled"
          class="multiselect__clear-button"
          @mousedown.prevent="clearSelectedValue"
        >
          ×
        </div>

        <!-- Add child clear slot so people can still extend the VueMultiselect slot -->
        <slot name="clear"></slot>
      </template>

      <template slot="afterList">
        <slot name="afterList" />
      </template>
    </vue-multiselect>
  </div>
</template>

<script>
import Vue from "vue";
import VueMultiselect from "vue-multiselect";
import isObject from "lodash.isobject";
import "vue-multiselect/dist/vue-multiselect.min.css";
import cloneDeep from "lodash.clonedeep";
import VueResizeObserver from "vue-resize-observer";
import { addChildrenProps, parseProp } from "./webComponentHelper";

Vue.use(VueResizeObserver);

const formatOptions = options => {
  return options.forEach(option => {
    if (isObject(option) && "disabled" in option) {
      option["$isDisabled"] = option["disabled"];
      delete option["disabled"];
    }
  });
};

export const isEqual = (a, b) => {
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;

  if (typeof a === "object") {
    // Prevent circular reference:
    if (a === b) return true;

    for (let key in a) {
      if (!Object.prototype.hasOwnProperty.call(a, key)) continue;

      if (typeof a[key] !== typeof b[key]) return false;

      if (typeof a[key] === "object") {
        if (!isEqual(a[key], b[key])) return false;
      } else if (a[key] !== b[key]) {
        return false;
      }
    }
    // Check that every key from b also exists in a:
    for (let key in b) {
      if (typeof b[key] !== typeof a[key]) return false;
    }
    return true;
  }
  return a === b;
};

// Copied from node_modules/vue-multiselect/src/multiselectMixin.js:
function isEmpty(opt) {
  if (opt === 0) return false;
  if (Array.isArray(opt) && opt.length === 0) return true;
  return !opt;
}

const UNLIMITED = 99999;

export default {
  name: "ZenMultiselect",
  components: { VueMultiselect },
  props: addChildrenProps(
    {
      allowEmpty: {
        type: Boolean,
        default: true
      },
      name: {
        type: String,
        default: ""
      },
      multiple: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      options: {
        type: [Array, String],
        required: false,
        default: () => []
      },
      renderSelectElement: {
        type: Boolean,
        default: false
      },
      value: {
        type: [Object, String, Array, Number],
        default: null
      },
      valid: {
        type: Boolean,
        default: null
      },
      showCheckboxes: {
        type: Boolean,
        default: true
      },
      customLabel: {
        type: Function,
        default: (option, label) =>
          isEmpty(option) ? "" : label ? option[label] : option
      },
      label: {
        type: String,
        default: ""
      },
      limit: {
        type: Number,
        default: UNLIMITED
      },
      customOptionSlot: {
        type: Boolean,
        default: false
      }
    },
    [VueMultiselect]
  ),
  data: function() {
    return {
      myLimit: UNLIMITED,
      myOptions: [],
      calculatingLimit: false
    };
  },
  computed: {
    attrs() {
      return Object.keys(this.$attrs).length
        ? this.$attrs
        : cloneDeep(this._props);
    },
    validationClass() {
      if (this.valid === null) {
        return "";
      }
      return this.valid ? "is-valid" : "is-invalid";
    },
    valueArray() {
      return Array.isArray(this.value_c)
        ? this.value_c
        : this.value_c && Object.keys(this.value_c).length
        ? [this.value_c]
        : [];
    },
    isValueSet() {
      return !!this.valueArray.length;
    },
    checkboxesVisible() {
      return !this.customOptionSlot && this.multiple && this.showCheckboxes;
    },
    options_c() {
      return parseProp(this.options, []);
    },
    value_c() {
      return parseProp(this.value, []);
    }
  },
  watch: {
    options_c: {
      immediate: true,
      deep: true,
      handler: function(value) {
        formatOptions(value);
        this.myOptions = cloneDeep(value);
        this.orderOptions();
        this.calcLimit();
      }
    }
  },
  created: function() {
    formatOptions(this.options_c);
  },
  methods: {
    clearSelectedValue() {
      const emptyValue = this.multiple ? [] : null;
      this.$emit("input", emptyValue);
    },
    async calcLimit() {
      if (!this.multiple) return;

      this.calculatingLimit = true;
      this.myLimit = UNLIMITED;
      await this.$nextTick();

      const items = this.$el.querySelectorAll(
        ".multiselect__tags .multiselect__tag"
      );
      const width = this.$el.offsetWidth - 140;
      let x = 0;
      let i = 0;
      while (items[i]) {
        x += items[i].offsetWidth;
        if (x > width) break;
        i++;
      }
      this.calculatingLimit = false;
      this.myLimit = Math.max(i, 1);
    },
    onChange(val) {
      this.$emit("input", val);
      this.calcLimit();
    },
    onOpen() {
      if (!this.multiple) return;
      this.myOptions = cloneDeep(this.options_c);
      this.orderOptions();
      this.$nextTick(() => {
        let el = this.$el.querySelectorAll(".multiselect__content-wrapper")[0];
        el.scroll(0, 0);
      });
    },
    onClose() {
      this.calcLimit();
    },
    onResize(value) {
      if (!value.width || value.width === this.lastWidth) return;
      this.lastWidth = value.width;
      this.debounceCalcLimit();
    },
    debounceCalcLimit(time = 300) {
      clearTimeout(this.calcLimitTimer);
      this.calcLimitTimer = setTimeout(this.calcLimit, time);
    },
    isSelected(option) {
      for (let b of this.value_c || []) {
        if (isEqual(b, option)) {
          return true;
        }
      }
    },
    orderOptions() {
      if (!Array.isArray(this.value_c)) return;
      // Reorder items, so that selected are on top:
      let selected = this.myOptions.filter(a =>
        this.isSelected(a, this.value_c)
      );
      let unSelected = this.myOptions.filter(
        a => !this.isSelected(a, this.value_c)
      );
      this.myOptions = selected.concat(unSelected);
    },
    // Copied from node_modules/vue-multiselect/src/multiselectMixin.js:
    getOptionLabel(option) {
      if (isEmpty(option)) return "";
      /* istanbul ignore else */
      if (option.isTag) return option.label;
      /* istanbul ignore else */
      if (option.$isLabel) return option.$groupLabel;

      let label = this.customLabel(option, this.label);
      /* istanbul ignore else */
      if (isEmpty(label)) return "";
      return label;
    }
  }
};
</script>

<style lang="scss">
@import "@reciprocity/bootstrap/scss/custom";
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";

/*
Mixins
======
*/

@mixin truncate($max-width) {
  display: block;
  max-width: $max-width;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/*
VueMultiselect
==============
*/

$vue-ms-padding-x: $input-padding-x;
$vue-ms-padding-y: $input-padding-y / 2;
$vue-ms-min-height: $input-height;
$vue-ms-border-radius: $border-radius;
$vue-ms-border-color: $input-border-color;
$vue-ms-border-width: $border-width-default;
$vue-ms-disabled-opacity: $btn-disabled-opacity;
$vue-ms-placeholder-color: $input-placeholder-color;
$vue-ms-bg: $input-bg;
$vue-ms-color: $input-color;
$vue-ms-disabled-bg: $input-disabled-bg;
$vue-ms-disabled-color: $input-color;

$vue-ms-option-selected-bg: $dropdown-link-active-bg;
$vue-ms-option-selected-color: $dropdown-link-active-color;
$vue-ms-option-highlight-color: $dropdown-link-hover-color;
$vue-ms-option-highlight-bg: $dropdown-link-hover-bg;
$vue-ms-option-selected-highlight-color: $dropdown-link-active-color;
$vue-ms-option-selected-highlight-bg: $dropdown-link-active-hover-bg;

$vue-ms-tag-color: $color-text-default;
$vue-ms-tag-bg: $color-ghost;
$vue-ms-tag-font-size: $badge-font-size;
$vue-ms-tag-font-weight: normal;
$vue-ms-tag-icon-size: 1.7rem;
$vue-ms-tag-icon-color: $color-oslo-gray;
$vue-ms-tag-icon-color-hover: $color-white;
$vue-ms-tag-icon-bg-hover: $color-oslo-gray;
$vue-ms-tag-padding-x: 0.4rem;
$vue-ms-tag-padding-y: 0.25rem;
$vue-ms-tag-border-radius: $badge-border-radius;

$vue-ms-arrow-color: $color-regent-gray;
$vue-ms-arrow-size: 5px;
$vue-ms-arrow-padding: 8px;

$vue-ms-spinner-size: 16px;
$vue-ms-spinner-thickness: 2px;
$vue-ms-spinner-margin: -$vue-ms-spinner-size / 2;
$vue-ms-spinner-color: $dark;

$title-truncate-width: 50ch;

.multiselect-wrapper {
  // --------------------------------
  // Select field
  // --
  width: 100%;

  fieldset[disabled] .multiselect {
    pointer-events: none;
  }

  .multiselect,
  .multiselect__input,
  .multiselect__single {
    font-family: inherit;
    font-size: inherit;
    touch-action: manipulation;
  }

  .multiselect {
    box-sizing: content-box;
    display: block;
    position: relative;
    width: 100%;
    min-height: $vue-ms-min-height;
    text-align: left;
    color: $vue-ms-color;

    * {
      box-sizing: border-box;
    }
    &:focus {
      outline: none;
    }
    &:not(.multiselect--active) {
      cursor: pointer;
    }
  }

  .multiselect--disabled {
    background: $vue-ms-disabled-bg;
    pointer-events: none;
    opacity: $vue-ms-disabled-opacity;

    .multiselect__current,
    .multiselect__select {
      background: $vue-ms-disabled-bg;
      color: $vue-ms-disabled-color;
    }
  }

  .multiselect--active {
    z-index: 50;
    &:not(.multiselect--above) .multiselect__current,
    &:not(.multiselect--above) .multiselect__input,
    &:not(.multiselect--above) .multiselect__tags {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    &.multiselect__select {
      transform: rotateZ(180deg);
    }
  }

  .multiselect--above.multiselect--active .multiselect__current,
  .multiselect--above.multiselect--active .multiselect__input,
  .multiselect--above.multiselect--active .multiselect__tags {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .multiselect__input,
  .multiselect__single {
    position: relative;
    float: left;
    min-height: $vue-ms-min-height / 2;
    line-height: 1;
    border: none;
    border-radius: $vue-ms-border-radius;
    background: inherit;
    padding: 0;
    width: 100%;
    transition: border 0.1s ease;
    box-sizing: border-box;
    margin-bottom: $vue-ms-padding-y;
    vertical-align: top;
    overflow: hidden;
    max-width: 100%;
  }

  .multiselect__single {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &.multiple .multiselect__input {
    position: absolute;
    padding-bottom: 0.3em;
    height: 1.8em;
    max-width: calc(100% - 1em);
  }

  &.multiple .input-wrapper .multiselect__input {
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIuMDI1IiBoZWlnaHQ9IjUxMi4wMjUiIHZpZXdCb3g9IjAgMCA1MTIuMDI1IDUxMi4wMjUiPgogIDxwYXRoIGlkPSJzZWFyY2giIGQ9Ik01MDguNSw0NjguOSwzODcuMSwzNDcuNWExMS44NjksMTEuODY5LDAsMCwwLTguNS0zLjVIMzY1LjRBMjA3LjQzNywyMDcuNDM3LDAsMCwwLDQxNiwyMDhDNDE2LDkzLjEsMzIyLjksMCwyMDgsMFMwLDkzLjEsMCwyMDgsOTMuMSw0MTYsMjA4LDQxNmEyMDcuNDM3LDIwNy40MzcsMCwwLDAsMTM2LTUwLjZ2MTMuMmExMi4zLDEyLjMsMCwwLDAsMy41LDguNUw0NjguOSw1MDguNWExMi4wMTEsMTIuMDExLDAsMCwwLDE3LDBsMjIuNi0yMi42QTEyLjAxMSwxMi4wMTEsMCwwLDAsNTA4LjUsNDY4LjlaTTIwOCwzNjhBMTYwLDE2MCwwLDEsMSwzNjgsMjA4LDE1OS45NTYsMTU5Ljk1NiwwLDAsMSwyMDgsMzY4WiIgZmlsbD0iI2Q3ZGNlMCIvPgo8L3N2Zz4K");
    background-repeat: no-repeat;
    background-position: right center;
    background-size: 14px;
    padding-right: 20px;
  }

  .multiselect__input::placeholder {
    color: $vue-ms-placeholder-color;
  }

  .multiselect__tag ~ .multiselect__input,
  .multiselect__tag ~ .multiselect__single {
    width: auto;
  }

  .multiselect__input:hover,
  .multiselect__single:hover {
    border-color: $color-ghost;
  }

  .multiselect__input:focus,
  .multiselect__single:focus {
    border-color: $color-hit-gray;
    outline: none;
  }

  .input-wrapper {
    border-bottom: 1px solid $color-athens-gray;

    .multiselect__input {
      background-color: transparent;
      position: relative;
      margin: 0;
      padding: 0;
      line-height: 32px;
      height: auto;
      text-indent: 8px;
      float: none;
    }
  }

  .multiselect__single {
    padding: $vue-ms-padding-y 0;
  }

  .multiselect__tags-wrap {
    display: flex;
    flex-wrap: nowrap;
    min-width: 0;
    overflow: hidden;
  }

  &.calculating-limit .multiselect__tags-wrap {
    display: block;
  }

  .multiselect__tags {
    min-height: $vue-ms-min-height;
    display: block;
    padding: $vue-ms-padding-y calc(1em + 1rem + 25px) 0 $vue-ms-padding-x;
    border-radius: $vue-ms-border-radius;
    border: $vue-ms-border-width solid $vue-ms-border-color;
    background: $custom-select-bg;
    font-family: inherit;
    font-size: inherit;

    &::after {
      content: "";
      display: table;
      clear: both;
    }
  }

  .multiselect__tags {
    display: flex;
    flex-wrap: nowrap;
  }

  .multiselect__limit-pill {
    flex: 0 0 auto;
    padding-right: 10px;
  }

  .multiselect__tag {
    position: relative;
    float: left;
    padding: $vue-ms-tag-padding-y
      ($vue-ms-tag-icon-size + $vue-ms-tag-padding-x) $vue-ms-tag-padding-y
      $vue-ms-tag-padding-x;
    border-radius: $vue-ms-tag-border-radius;
    margin: 0 $vue-ms-tag-padding-x $vue-ms-tag-padding-y 0;
    color: $vue-ms-tag-color;
    background: $vue-ms-tag-bg;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
    text-overflow: ellipsis;
    font-size: 100%;
    font-weight: $vue-ms-tag-font-weight;
  }

  .multiselect__tag span {
    @include truncate($title-truncate-width);
  }

  .multiselect__tag-icon {
    cursor: pointer;
    margin-left: $vue-ms-tag-padding-y;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    font-style: initial;
    width: $vue-ms-tag-icon-size;
    text-align: center;
    line-height: 1.275rem;
    transition: all 0.2s ease;
    font-size: 50%;
    font-weight: $vue-ms-tag-font-weight;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .multiselect__tag-icon::after {
    content: "×";
    color: $vue-ms-tag-icon-color;
    font-size: 343%;
    font-weight: 500;
  }

  .multiselect__tag-icon:focus,
  .multiselect__tag-icon:hover {
    background: $vue-ms-tag-icon-bg-hover;
  }

  .multiselect__tag-icon:focus::after,
  .multiselect__tag-icon:hover::after {
    color: $vue-ms-tag-icon-color-hover;
  }

  .multiselect__current {
    line-height: $vue-ms-min-height / 2;
    min-height: $vue-ms-min-height;
    box-sizing: border-box;
    display: block;
    overflow: hidden;
    padding: 8px 30px 0 12px;
    white-space: nowrap;
    margin: 0;
    text-decoration: none;
    border-radius: $vue-ms-border-radius;
    border: 1px solid $vue-ms-border-color;
    cursor: pointer;
  }

  .multiselect__select {
    line-height: $vue-ms-min-height / 2;
    display: block;
    position: absolute;
    box-sizing: border-box;
    width: $vue-ms-min-height;
    height: $vue-ms-min-height;
    right: 0;
    top: 0;
    padding: ($vue-ms-arrow-padding) $vue-ms-arrow-padding;
    margin: 0;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s ease;
    z-index: 2;
  }

  .multiselect__select::before {
    position: relative;
    right: 0;
    top: 70%;
    color: $vue-ms-arrow-color;
    border-style: solid;
    border-width: $vue-ms-arrow-size $vue-ms-arrow-size 0 $vue-ms-arrow-size;
    border-color: $vue-ms-arrow-color transparent transparent transparent;
    content: "";
  }

  .multiselect__placeholder {
    color: $vue-ms-placeholder-color;
    display: inline-block;
    margin-bottom: 6px;
    padding-top: $vue-ms-padding-y;
    line-height: 1;
  }

  .multiselect--active .multiselect__placeholder {
    display: none;
  }

  .multiselect__content-wrapper {
    position: absolute;
    display: block;
    background: $vue-ms-bg;
    width: auto;
    min-width: 100%;
    max-height: 240px;
    max-width: 100%;
    overflow: auto;
    border: $vue-ms-border-width solid $vue-ms-border-color;
    margin-top: -1px;
    border-bottom-left-radius: $vue-ms-border-radius;
    border-bottom-right-radius: $vue-ms-border-radius;
    z-index: 50;
    -webkit-overflow-scrolling: touch;
  }

  .multiselect__content {
    list-style: none;
    display: inline-block;
    padding: 0;
    margin: 0;
    min-width: 100%;
    max-width: 100%;
    vertical-align: top;
  }

  .multiselect--above .multiselect__content-wrapper {
    bottom: 100%;
    border-radius: $vue-ms-border-radius $vue-ms-border-radius 0 0;
    border-bottom: none;
    border-top: $vue-ms-border-width solid $vue-ms-border-color;
  }

  .multiselect__content::-webkit-scrollbar {
    display: none;
  }

  .multiselect__element {
    display: block;
  }

  .multiselect__option {
    display: block;
    padding: $vue-ms-padding-y $vue-ms-padding-x;
    min-height: 0;
    line-height: 1.5rem;
    text-decoration: none;
    text-transform: none;
    position: relative;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .multiselect__option::after {
    top: 0;
    right: 0;
    position: absolute;
    line-height: $vue-ms-min-height;
    padding-right: 12px;
    padding-left: 20px;
    font-family: inherit;
    font-size: inherit;
  }

  .checkbox_parent {
    pointer-events: none;
    display: flex;
    align-items: center;
  }

  .multiselect__checkbox {
    margin-right: 9px;
  }

  .multiselect__checkbox + span {
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .multiselect__option--highlight {
    background: $vue-ms-option-highlight-bg;
    outline: none;
    color: $vue-ms-option-highlight-color;
  }

  .multiselect__option--highlight::after {
    content: attr(data-select);
    background: $vue-ms-option-highlight-bg;
    color: $vue-ms-option-highlight-color;
  }

  .multiselect__option--selected {
    background: $vue-ms-option-selected-bg;
    color: $vue-ms-option-selected-color;
    font-weight: normal;
  }

  .multiselect__option--selected::after {
    content: attr(data-selected);
    color: $color-white;
  }

  .multiselect__option--selected.multiselect__option--highlight {
    background: $vue-ms-option-selected-highlight-bg;
    color: $vue-ms-option-selected-highlight-color;
  }

  .multiselect__option--selected.multiselect__option--highlight::after {
    background: $vue-ms-option-selected-highlight-bg;
    content: attr(data-deselect);
    color: $vue-ms-option-selected-highlight-color;
  }

  .multiselect__option--disabled {
    background: $vue-ms-disabled-bg;
    color: $vue-ms-disabled-color;
    cursor: text;
    pointer-events: none;
  }

  .multiselect__option--group {
    background: $vue-ms-disabled-bg;
    color: $vue-ms-disabled-color;

    &.multiselect__option--highlight {
      background: $vue-ms-disabled-color;
      color: $vue-ms-disabled-bg;
    }

    &.multiselect__option--highlight::after {
      background: $vue-ms-disabled-color;
    }
  }

  .multiselect__option--disabled.multiselect__option--highlight {
    background: $vue-ms-disabled-bg;
  }

  .multiselect__option--group-selected.multiselect__option--highlight {
    background: $vue-ms-option-selected-highlight-bg;
    color: $vue-ms-option-selected-highlight-color;
  }

  .multiselect__option--group-selected.multiselect__option--highlight::after {
    background: $vue-ms-option-selected-highlight-bg;
    content: attr(data-deselect);
    color: $vue-ms-option-selected-highlight-color;
  }

  .multiselect__action {
    &:hover {
      color: $primary;
    }
    &.disabled {
      color: $custom-select-disabled-color;
      cursor: default;
    }
  }

  .multiselect-enter-active,
  .multiselect-leave-active {
    transition: all 0.15s ease;
  }

  .multiselect-enter,
  .multiselect-leave-active {
    opacity: 0;
  }

  .multiselect__strong {
    margin-bottom: $vue-ms-padding-y;
    line-height: $vue-ms-min-height / 2;
    display: inline-block;
    vertical-align: top;
  }

  .multiselect__clear-button {
    position: absolute;
    height: 100%;
    right: 30px;
    padding: 2px 0;
    font-size: 1.3em;
    z-index: 10;
    cursor: pointer;
  }

  // --------------------------------
  // Spinner
  // --

  .multiselect__spinner {
    position: absolute;
    right: 0;
    top: 0;
    width: $vue-ms-min-height;
    height: $vue-ms-min-height;
    background: $vue-ms-disabled-bg;
    display: block;

    &::before,
    &::after {
      position: absolute;
      content: "";
      top: 50%;
      left: 50%;
      margin: $vue-ms-spinner-margin 0 0 $vue-ms-spinner-margin;
      width: $vue-ms-spinner-size;
      height: $vue-ms-spinner-size;
      border-radius: 100%;
      border: $vue-ms-spinner-thickness solid transparent;
      border-top-color: $vue-ms-spinner-color;
      box-shadow: 0 0 0 1px transparent;
    }

    &::before {
      animation: spinning 2.4s cubic-bezier(0.41, 0.26, 0.2, 0.62);
      animation-iteration-count: infinite;
    }

    &::after {
      animation: spinning 2.4s cubic-bezier(0.51, 0.09, 0.21, 0.8);
      animation-iteration-count: infinite;
    }
  }

  @keyframes spinning {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(2turn);
    }
  }

  // --------------------------------
  // Loading state
  // --

  .multiselect__loading-enter-active,
  .multiselect__loading-leave-active {
    transition: opacity 0.4s ease-in-out;
    opacity: 1;
  }

  .multiselect__loading-enter,
  .multiselect__loading-leave-active {
    opacity: 0;
  }

  // --------------------------------
  // RTL adjustments
  // --

  *[dir="rtl"] {
    .multiselect {
      text-align: right;
    }

    .multiselect__select {
      right: auto;
      left: 1px;
    }

    .multiselect__tags {
      padding: $vue-ms-padding-y $vue-ms-padding-y 0 $vue-ms-min-height;
    }

    .multiselect__content {
      text-align: right;
    }

    .multiselect__option::after {
      right: auto;
      left: 0;
    }

    .multiselect__clear {
      right: auto;
      left: 12px;
    }

    .multiselect__spinner {
      right: auto;
      left: 1px;
    }
  }
}
</style>
