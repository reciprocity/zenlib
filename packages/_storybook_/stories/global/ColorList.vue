<template>
  <div>
    <div
      v-for="(group, index) in Object.keys(colors)"
      :key="index"
      class="group p-3"
    >
      <h4 class="group__title">{{ group }}</h4>
      <b-card-group deck class="m-0">
        <b-card
          v-for="(color, idx) in colors[group]"
          :key="idx"
          no-body
          class="size m-1"
          align="center"
        >
          <div
            class="color-block"
            :style="{ backgroundColor: color.value }"
          ></div>
          <b-card-body class="d-flex flex-column p-1">
            <span @click="copy(color.variable)">{{ color.variable }}</span>
            <span @click="copy(color.value)">{{ color.value }}</span>
          </b-card-body>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import { BCard, BCardBody, BCardGroup } from "bootstrap-vue";

export default {
  name: "ColorList",
  components: {
    BCard,
    BCardBody,
    BCardGroup
  },
  props: {
    colors: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    copy(color) {
      let text = document.createElement("textarea");
      text.innerHTML = `${color}`;
      document.body.appendChild(text);
      text.select();
      let result = document.execCommand("copy");
      document.body.removeChild(text);
      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/custom.scss";

.group {
  cursor: pointer;
  background-color: white;
  border-radius: 5px;

  &__title {
    text-transform: capitalize;
    color: $color-abs-oslo-gray;
  }
}

.color-block {
  height: 3rem;
  border-bottom: 1px solid $color-abs-wild-sand;
}

.card {
  flex: 0 !important;

  .card-body {
    span {
      font-size: 0.8rem;
    }
    span + span {
      text-transform: uppercase;
      padding-top: 5px;
    }
  }
}

.size {
  min-width: 150px;
}
</style>
