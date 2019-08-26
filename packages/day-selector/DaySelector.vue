<template>
  <div class="day-selector">
    <label v-for="day in dayNames" :key="day" class="day">
      <input
        :id="day"
        :checked="value.includes(day)"
        type="checkbox"
        @input="toggle(day)"
      />
      <span class="box">{{ generateLabel(day) }}</span>
    </label>
  </div>
</template>

<script>
import Vue from "vue";
import capitalize from "lodash.capitalize";
import cloneDeep from "lodash.clonedeep";
import includes from "lodash.includes";
import without from "lodash.without";
import { eachDay, endOfWeek, format, startOfWeek } from "date-fns";

export default Vue.extend({
  name: "DaySelector",
  props: {
    value: {
      type: Array,
      required: true
    },
    dayNames: {
      type: Array,
      default: () =>
        eachDay(startOfWeek(new Date()), endOfWeek(new Date())).map(date =>
          format(date, "dddd").toLowerCase()
        )
    }
  },
  methods: {
    toggle(day) {
      let newDays;
      if (includes(this.value, day)) {
        newDays = without(this.value, day);
      } else {
        newDays = cloneDeep(this.value);
        newDays.splice(this.value.indexOf(day), 0, day);
      }
      this.$emit("input", newDays);
    },
    generateLabel(day) {
      return capitalize(day.substring(0, 2));
    }
  }
});
</script>

<style lang="scss" scoped>
@import "@reciprocity/bootstrap/scss/colors";
@import "@reciprocity/bootstrap/scss/variables";

.day-selector {
  display: flex;

  .day {
    margin-bottom: 0;
  }

  .day:not(:first-child) {
    margin-left: 10px;
  }
  input {
    display: none;
  }

  .box {
    display: block;
    width: 42px;
    line-height: 29.5px;
    border: 2px solid $border-color-default;
    color: $color-oslo-gray;
    background: $color-wild-sand;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
  }

  input:checked ~ .box {
    border-color: $color-app-primary;
    color: $color-text-default;
    background: $color-zircon;
  }
}
</style>
