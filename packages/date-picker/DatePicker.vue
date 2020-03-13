<template>
  <date-picker
    class="date-picker"
    :lang="lang"
    :format="format"
    :value-type="valueType"
    :time-title-format="printFormat"
    :title-format="printFormat"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot v-for="(_, name) in $slots" :slot="name" :name="name" />
    <template v-if="!$slots.input" v-slot:input>
      <div>
        <input
          class="date-picker__input"
          :value="formattedDate"
          :readonly="true"
        />
      </div>
    </template>
  </date-picker>
</template>

<script lang="ts">
import Vue from "vue";
import DatePicker from "vue2-datepicker";
import "./datepicker.scss";
import { format as formatDate, parse as parseDate } from "date-format-parse";

export default Vue.extend({
  components: {
    DatePicker
  },
  props: {
    lang: {
      type: Object,
      default() {
        return {
          monthFormat: "MMMM"
        };
      }
    },
    valueType: {
      type: String,
      default: "format"
    },
    altInput: {
      type: Boolean,
      default: true
    },
    // TODO: If the component `type` is not `date`, this default value may not
    // generates the expected behaviour
    format: {
      type: String,
      default: "YYYY-MM-DD"
    },
    altFormat: {
      type: String,
      default: "MM/DD/YYYY"
    },
    rangeSeparator: {
      type: String,
      default: " ~ "
    }
  },
  computed: {
    printFormat() {
      return this.altInput ? this.altFormat : this.format;
    },
    formattedDate() {
      const { value, range } = this.$attrs;
      if (!value) return value;
      return range !== undefined
        ? value.map(this.formatDate).join(this.rangeSeparator)
        : this.formatDate(value);
    }
  },
  methods: {
    formatDate(date) {
      const { valueType, printFormat, format } = this;
      let parsedDate;
      if (valueType === "timestamp") {
        parsedDate = new Date(date);
      } else if (valueType === "date") {
        parsedDate = date;
      } else if (valueType === "format") {
        parsedDate = parseDate(date, format);
      } else {
        parsedDate = parseDate(date, valueType);
      }
      return formatDate(parsedDate, printFormat);
    }
  }
});
</script>

<style lang="scss" scoped>
@import "@reciprocity/bootstrap/scss/colors";
@import "@reciprocity/bootstrap/scss/variables";

.date-picker {
  &__input {
    width: 100%;
    height: calc(1em + 1rem + 2px);
    padding: 0.5rem;
    color: $color-trout;
    background-color: $color-white;
    background-clip: padding-box;
    border: $border-default;
    border-radius: 0.125rem;
  }
}
</style>
