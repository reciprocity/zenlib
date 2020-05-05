<template>
  <div v-resize="onResize" class="zen-tabs">
    Tabs
  </div>
</template>

<script>
import Vue from "vue";
import VueResizeObserver from "vue-resize-observer";

Vue.use(VueResizeObserver);

export default {
  name: "ZenTabs",
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data: function() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss">
@import "@reciprocity/bootstrap/scss/custom";
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
</style>
