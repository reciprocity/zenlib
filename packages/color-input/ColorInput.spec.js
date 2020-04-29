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

  it("emmits correct color", async () => {
    const wrapper = shallowMount(ColorInput, {
      propsData: {
        value: "#0099FF"
      }
    });
    wrapper.vm.color = "#ff0000";
    await wrapper.vm.$nextTick();
    let emit = wrapper.emitted("input")[0];
    expect(emit[0]).toBe("#ff0000");
  });
});
