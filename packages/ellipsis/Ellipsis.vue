<!--
Copyright (C) 2019 Reciprocity, Inc - All Rights Reserved
Unauthorized use, copying, distribution, displaying, or public performance
of this file, via any medium, is strictly prohibited. All information
contained herein is proprietary and confidential and may not be shared
with any third party without the express written consent of Reciprocity, Inc.
-->

<template>
  <div :class="wrapperClass">
    <div class="content">
      <slot />
    </div>
    <a href="#" class="ellipsis-toggle" @click.prevent="toggle" />
  </div>
</template>

<script>
export default {
  name: "Ellipsis",
  data() {
    return {
      expanded: false
    };
  },
  computed: {
    wrapperClass() {
      return ["text-ellipsis", { "is-expanded": this.expanded }];
    }
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@reciprocity/bootstrap/scss/colors";

$height: 1.0625rem;

.text-ellipsis {
  max-height: 3 * $height;
  overflow: hidden;
  position: relative;
  background: inherit;

  .content :last-child {
    margin-bottom: 0;
  }

  .ellipsis-toggle {
    background: inherit;
    display: block;
    height: $height;
    left: 0;
    position: absolute;
    right: 0;
    text-align: left;
    top: 2 * $height;

    &::after {
      content: "More \0021e3";
    }
  }

  &.is-expanded {
    max-height: none;

    .ellipsis-toggle {
      position: static;
      background: none;

      &::after {
        content: "Less \0021e1";
        top: 0;
      }
    }
  }
}
</style>
