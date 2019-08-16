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

  it("should fire input event when selecting a day", () => {
    const wrapper = shallowMount(DaySelector, {
      propsData: {
        value: []
      }
    });
    const day = wrapper.find("input[type='checkbox']");
    expect(wrapper.emitted().input).toBeFalsy();
    day.trigger("click");
    expect(wrapper.emitted().input.length).toBe(1);
  });

  it("should add new selected day to value list", () => {
    const wrapper = shallowMount(DaySelector, {
      propsData: {
        value: ["monday", "friday"]
      }
    });
    expect(wrapper.emitted().input).toBeFalsy();

    const sunday = wrapper.find("input[id='sunday']");
    sunday.trigger("click");

    expect(wrapper.emitted().input[0]).toEqual([
      ["monday", "sunday", "friday"]
    ]);
  });

  it("should remove selected day to value list", () => {
    const wrapper = shallowMount(DaySelector, {
      propsData: {
        value: ["sunday", "friday"]
      }
    });
    expect(wrapper.emitted().input).toBeFalsy();

    const sunday = wrapper.find("input[id='sunday']");
    sunday.trigger("click");

    expect(wrapper.emitted().input[0]).toEqual([["friday"]]);
  });
});
