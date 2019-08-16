import DaySelector from "./DaySelector.vue";
import { shallowMount } from "@vue/test-utils";

describe("DaySelector", () => {
  it("should render", () => {
    const wrapper = shallowMount(DaySelector, {
      propsData: {
        value: []
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});
