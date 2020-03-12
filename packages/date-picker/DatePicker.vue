<template>
  <date-picker
    class="date-picker"
    :lang="lang"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot v-for="(_, name) in $slots" :slot="name" :name="name" />
  </date-picker>
</template>

<script lang="ts">
import Vue from "vue";
import DatePicker from "vue2-datepicker";
import "./datepicker.scss";

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
    }
  }
});
</script>
