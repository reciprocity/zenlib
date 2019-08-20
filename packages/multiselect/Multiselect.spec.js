import Multiselect from "./Multiselect.vue";
import { shallowMount } from "@vue/test-utils";

describe("Multiselect", () => {
  it("should render", () => {
    const wrapper = shallowMount(Multiselect);
    expect(wrapper.exists()).toBe(true);
  });
});
