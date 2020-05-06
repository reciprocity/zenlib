import Tabs from "./Tabs.vue";
import { shallowMount } from "@vue/test-utils";

let items = [
  { label: "United States with a long title" },
  { label: "Argentina" },
  { label: "Slovenia" }
];

let defaultData = {
  propsData: { items }
};

describe("Tabs.vue", () => {
  it("renders empty", () => {
    const wrapper = shallowMount(Tabs, {});
    expect(wrapper.findAll(".item").length).toBe(0);
  });

  it("renders items", () => {
    const wrapper = shallowMount(Tabs, defaultData);
    expect(wrapper.findAll(".item").length).toBe(3);
  });

  it("recalculates on resize", async () => {
    jest.useFakeTimers();

    const wrapper = shallowMount(Tabs, defaultData);
    wrapper.vm.calcLimit = jest.fn();

    wrapper.vm.onResize({ width: 400 });

    jest.runAllTimers();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.calcLimit).toHaveBeenCalled();
  });

  it("works with customLabel()", async () => {
    const wrapper = shallowMount(Tabs, {
      propsData: {
        items,
        customLabel: a => a.label + "_addon"
      }
    });
    expect(
      wrapper
        .findAll(".item")
        .at(2)
        .text()
    ).toBe("Slovenia_addon");
  });

  it("emmits removeClicked", async () => {
    const wrapper = shallowMount(Tabs, defaultData);

    wrapper
      .findAll(".item .remove")
      .at(2)
      .trigger("click");

    await wrapper.vm.$nextTick();
    let emit = wrapper.emitted("removeClicked")[0];
    expect(emit[0].item.label).toBe("Slovenia");
  });
});
