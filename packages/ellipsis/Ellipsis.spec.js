import Ellipsis from "./Ellipsis.vue";
import { shallowMount } from "@vue/test-utils";

describe("Ellipsis", () => {
  it("should render", () => {
    const wrapper = shallowMount(Ellipsis);
    expect(wrapper.exists()).toBe(true);
  });
});
