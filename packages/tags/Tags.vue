<template>
  <div
    v-resize="onResize"
    class="zen-tags-items"
    :class="{
      'calculating-limit': calculatingLimit
    }"
  >
    <template>
      <ul class="items-wrapper">
        <slot v-for="(item, i) of items" name="item">
          <li v-if="i < myLimit" :key="i" class="item">
            <span class="label">{{ getItemLabel(item) }}</span>
            <span class="remove" @click="onRemoveClicked(item, i)"></span>
          </li>
        </slot>
      </ul>

      <template v-if="moreItemsCount">
        <slot name="more">
          <div class="item more">{{ moreItemsText }}</div>
        </slot>
      </template>
    </template>
  </div>
</template>

<script>
import Vue from "vue";
import VueResizeObserver from "vue-resize-observer";

Vue.use(VueResizeObserver);

const UNLIMITED = 99999;

export default {
  name: "ZenTags",
  props: {
    items: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: "label"
    },
    customLabel: {
      type: Function,
      default: undefined
    },
    moreText: {
      type: Function,
      default: undefined
    },
    limitItemWidth: {
      type: Number,
      default: 40
    }
  },
  data: function() {
    return {
      myLimit: 1,
      calculatingLimit: false
    };
  },
  computed: {
    moreItemsCount() {
      return Math.max(0, this.items.length - this.myLimit);
    },
    moreItemsText() {
      let count = this.moreItemsCount;
      return this.moreText ? this.moreText(count) : `${count}+`;
    }
  },
  watch: {
    items: {
      handler: function() {
        this.calcLimit();
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getItemLabel(item) {
      if (this.customLabel) {
        return this.customLabel(item);
      }
      return item[this.label] || `[${this.label}]`;
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
    async calcLimit() {
      // Show all items in their full size, so we can get their widths:
      this.calculatingLimit = true;
      this.myLimit = UNLIMITED;
      await this.$nextTick();

      const items = this.$el.querySelectorAll(".items-wrapper > *");
      const width = this.$el.offsetWidth - this.limitItemWidth;
      let x = 0;
      let i = 0;
      while (items[i]) {
        x += items[i].offsetWidth;
        if (x > width) break;
        i++;
      }

      this.myLimit = Math.max(i, 1);
      this.calculatingLimit = false;
    },
    onRemoveClicked(item, index) {
      this.$emit("removeClicked", { item, index });
    }
  }
};
</script>

<style lang="scss">
@import "@reciprocity/bootstrap/scss/custom";
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";

.zen-tags-items {
  display: flex;

  .items-wrapper {
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;
    min-height: 2.2em;
  }

  // Force original widths for each item:
  &.calculating-limit .multiselect__tags-wrap {
    display: block;
  }

  .item {
    display: flex;
    align-items: center;
    background-color: #fff;
    margin: 0.25rem;
    background-color: $color-ghost;
    border-radius: 0.125rem;
    padding: 0;
    overflow: hidden;

    &.more {
      padding: 0 0.5em;
    }
  }

  .label,
  .remove {
    display: block;
  }

  .label {
    padding: 0 0.5em;
    line-height: 1.6em;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .remove {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: $color-oslo-gray;
    font-weight: 500;
    padding: 0 0.25em;
    margin-top: -2px;
    height: 100%;
    font-size: 1.2em;

    &:after {
      content: "\D7";
    }

    &:hover {
      background-color: $color-oslo-gray;
      color: $color-white;
    }
  }
}
</style>
