import LoadingSpinner from "./LoadingSpinner.vue";
import { shallowMount } from "@vue/test-utils";

describe("LoadingSpinner", () => {
  it("should render", () => {
    const wrapper = shallowMount(LoadingSpinner);
    expect(wrapper.exists()).toBe(true);
  });
});
