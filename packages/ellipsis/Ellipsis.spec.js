import Ellipsis from "./Ellipsis.vue";
import { shallowMount } from "@vue/test-utils";

describe("Ellipsis", () => {
  it("should render", () => {
    const wrapper = shallowMount(Ellipsis);
    expect(wrapper.exists()).toBe(true);
  });

  it("should expand when More link is clicked", () => {
    const wrapper = shallowMount(Ellipsis);
    expect(wrapper.find(".text-ellipsis").classes("is-expanded")).toBe(false);
    wrapper.find(".ellipsis-toggle").trigger("click");
    expect(wrapper.find(".text-ellipsis").classes("is-expanded")).toBe(true);
  });
});
