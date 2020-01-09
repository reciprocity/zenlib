<template>
  <vue-multiselect
    v-model="value"
    :options="options"
    :multiple="true"
    :close-on-select="false"
    :clear-on-select="false"
    :preserve-search="true"
    :placeholder="placeholder"
    :label="label"
    :track-by="trackBy"
    v-on="$listeners"
  >
    <template slot="selection" slot-scope="{ values, isOpen }">
      <span v-if="values.length &amp;&amp; !isOpen" class="multiselect__single">
        {{ values.length }} selected
      </span>
    </template>
    <template slot="option" slot-scope="props">
      <input
        class="option-checkbox"
        type="checkbox"
        :checked="isSelected(props.option.value)"
      />
      <span>{{ props.option.label }}</span>
    </template>
  </vue-multiselect>
</template>

<script>
import VueMultiselect from "vue-multiselect";

export default {
  name: "ZenDropdownMultiselect",
  components: { VueMultiselect },
  props: {
    options: {
      type: Array,
      required: false,
      default: () => []
    },
    placeholder: {
      type: String,
      default: undefined
    },
    label: {
      type: String,
      default: "label"
    },
    trackBy: {
      type: String,
      default: "value"
    }
  },
  data() {
    return {
      value: []
    };
  },
  methods: {
    isSelected(optionValue) {
      return !!this.value.find(option => option.value === optionValue);
    }
  }
};
</script>

<style lang="scss">
@import "@reciprocity/bootstrap/scss/custom";

.option-checkbox {
  position: relative;
  bottom: 2px;
}
.multiselect__tags-wrap {
  display: none;
}
.multiselect__option--highlight {
  background: $white;
  color: $black;
}
.multiselect__option--highlight:after {
  display: none;
}
.multiselect__option--selected {
  font-weight: normal;
}
.multiselect__option--selected.multiselect__option--highlight {
  background: $white;
  color: $black;
}
.multiselect__option--selected:after {
  display: none;
}
</style>
