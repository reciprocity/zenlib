<template>
  <div class="loading-spinner-wrap">
    <div class="spacer" />
    <div class="loading-spinner">
      <spinner />
      <div class="text">{{ text }}</div>
    </div>
  </div>
</template>

<script>
import Spinner from "./Spinner.vue";

export default {
  components: {
    Spinner
  },
  props: {
    text: {
      type: String,
      default: "Loading..."
    }
  }
};
</script>

<style lang="scss">
@import "@reciprocity/bootstrap/scss/variables";

.loading-spinner-wrap {
  display: block;
  position: relative;
  width: 100%;

  .spacer {
    min-height: 50px;
  }

  .loading-spinner {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    border: 1px solid $color-app-primary;
    color: $color-app-primary;
    border-radius: 4px;
    padding: 10px;
    transform: translateY(-50%) translateX(-50%);
    font-size: 14px;
    font-weight: bold;
    cursor: default;
    white-space: nowrap;

    .text {
      display: inline-block;
      margin-left: 5px;
      vertical-align: middle;
      text-transform: uppercase;
      white-space: normal;
    }
  }
}
</style>
