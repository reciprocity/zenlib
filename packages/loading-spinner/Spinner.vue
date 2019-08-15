<template>
  <span class="circle" />
</template>

<style lang="scss">
@import "@reciprocity/bootstrap/scss/colors";
@import "@reciprocity/bootstrap/scss/variables";

.circle {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;

  &::before,
  &::after {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 100%;
    border: 2px solid transparent;
    box-sizing: border-box;
  }

  &::before {
    border-color: mix($color-app-primary, $color-white, 20%);
  }

  &::after {
    border-top-color: $color-app-primary;
    transform-origin: 50% 50%;
    animation: rotate-spinner 1s infinite linear;
  }
}

@keyframes rotate-spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
