import ColorInput from "./ColorInput.vue";
import { shallowMount } from "@vue/test-utils";

describe("ColorInput", () => {
  it("should render", () => {
    const wrapper = shallowMount(ColorInput, {
      propsData: {
        value: "#0099FF"
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});
