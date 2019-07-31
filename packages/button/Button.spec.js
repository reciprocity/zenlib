import Button from "./Button.vue";
import { shallowMount } from "@vue/test-utils";

describe("Button", () => {
  it("should render", () => {
    const wrapper = shallowMount(Button);
    expect(wrapper.exists()).toBe(true);
  });
});
