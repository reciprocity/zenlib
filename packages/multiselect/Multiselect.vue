<template>
  <div
    class="multiselect-wrapper"
    :class="{ calculating_limit: calculatingLimit }"
  >
    <vue-multiselect
      :name="name"
      :multiple="multiple"
      :disabled="disabled"
      :class="validationClass"
      :options="myOptions"
      :option-height="35"
      :value="value"
      :allow-empty="allowEmpty"
      :show-labels="false"
      :limit="myLimit"
      v-bind="$attrs"
      v-on="$listeners"
      @input="onChange"
      @open="onOpen"
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

      <template slot="limit">
        <span class="multiselect__tag multiselect__limit-pill">
          <span>+{{ (value || []).length - myLimit }}</span>
        </span>
      </template>

      <template slot="beforeList">
        <span
          class="multiselect__action multiselect__option"
          :class="{ disabled: !isValueSet }"
          @click="clearSelectedValue"
          ><small>Clear selection</small></span
        >
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
import VueMultiselect from "vue-multiselect";
import isObject from "lodash.isobject";
import "vue-multiselect/dist/vue-multiselect.min.css";
import cloneDeep from "lodash.clonedeep";

const formatOptions = options => {
  return options.forEach(option => {
    if (isObject(option) && "disabled" in option) {
      option["$isDisabled"] = option["disabled"];
      delete option["disabled"];
    }
  });
};

const UNLIMITED = 99999;

export default {
  name: "ZenMultiselect",
  components: { VueMultiselect },
  props: {
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
      type: Array,
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
    }
  },
  data: function() {
    return {
      newFlag: false,
      myLimit: UNLIMITED,
      myOptions: [],
      calculatingLimit: false
    };
  },
  computed: {
    validationClass() {
      if (this.valid === null) {
        return "";
      }
      return this.valid ? "is-valid" : "is-invalid";
    },
    valueArray() {
      return Array.isArray(this.value)
        ? this.value
        : this.value && Object.keys(this.value).length
        ? [this.value]
        : [];
    },
    isValueSet() {
      return !!this.valueArray.length;
    }
  },
  watch: {
    options: {
      immediate: true,
      handler: function(value) {
        formatOptions(value);
        this.myOptions = cloneDeep(value);
        this.orderOptions();
      }
    }
  },
  created: function() {
    formatOptions(this.options);
  },
  mounted: function() {
    // Todo: remove once flag is removed and multiselect is in GA:
    function anyParentWithClass(element, clas) {
      return (
        (element.className &&
          element.className.split(" ").indexOf(clas) >= 0) ||
        (element.parentNode && anyParentWithClass(element.parentNode, clas))
      );
    }

    this.newFlag = anyParentWithClass(this.$el, "multiselect_improvements");
    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(this.onResize);
      observer.observe(this.$el);
    }
  },
  methods: {
    clearSelectedValue() {
      const emptyValue = this.multiple ? [] : "";
      this.$emit("input", emptyValue);
    },
    calcLimit() {
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
      return Math.max(i, 1);
    },
    onChange() {
      if (!this.multiple) return;
      this.debounceCalcLimit(16);
    },
    onOpen() {
      this.myOptions = cloneDeep(this.options);
      this.orderOptions();
      this.$nextTick(() => {
        this.$el
          .querySelectorAll(".multiselect__content-wrapper")[0]
          .scroll(0, 0);
      });
    },
    onResize() {
      this.debounceCalcLimit();
    },
    debounceCalcLimit(time) {
      clearTimeout(this.calcLimitTimer);
      this.calcLimitTimer = setTimeout(() => {
        this.calculatingLimit = true;
        this.myLimit = UNLIMITED;
        this.$nextTick(() => {
          this.myLimit = this.calcLimit();
        });
      }, time || 300);
    },
    orderOptions() {
      if (!Array.isArray(this.value)) return;

      function isSelected(a, selected) {
        for (let b of selected || []) {
          if (b === a) return true;
        }
      }
      // Reorder items, so that selected are on top:
      let selected = this.myOptions.filter(a => isSelected(a, this.value));
      let unSelected = this.myOptions.filter(a => !isSelected(a, this.value));
      this.myOptions = selected.concat(unSelected);
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

$vue-ms-arrow-color: $custom-select-color;
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
    padding: 0 0 0 $vue-ms-padding-x;
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

  .multiselect__input {
    padding-left: 0;
    margin-bottom: 6px;
    order: -1;
    flex: 1 1 auto;
    margin-right: 3px;
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

  .multiselect__single {
    padding: $vue-ms-padding-y 0;
  }

  .multiselect__tags-wrap {
    display: flex;
    flex-wrap: nowrap;
    min-width: 0;
    overflow: hidden;
  }

  &.calculating_limit .multiselect__tags-wrap {
    display: block;
  }

  .multiselect__tags {
    min-height: $vue-ms-min-height;
    display: flex;
    flex-wrap: nowrap;
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

  .multiselect__limit-pill {
    flex: 0 0 auto;
    margin-left: 3px !important;
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
