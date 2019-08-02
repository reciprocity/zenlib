<template>
  <b-button v-bind="$attrs" :class="{ loading: showLoader }" v-on="$listeners">
    <i v-if="showLoader" class="fa fa-circle-o-notch fa-spin spinner" />
    <span class="text">
      <slot />
    </span>
  </b-button>
</template>

<script>
import { BButton } from "bootstrap-vue";

export default {
  name: "Button",
  components: { BButton },
  props: {
    showLoader: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.loading {
  position: relative;

  .text {
    visibility: hidden;
  }

  .spinner {
    left: 50%;
    margin: -7px 0 0 -7px;
    position: absolute;
    top: 50%;
  }
}
</style>
