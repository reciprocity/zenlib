import Tabs from "./Tabs.vue";
import { shallowMount } from "@vue/test-utils";

describe("Tabs.vue", () => {
  it("todo", () => {
    const wrapper = shallowMount(Tabs);
    expect(wrapper.text()).toBe("Tabs");
  });
});
