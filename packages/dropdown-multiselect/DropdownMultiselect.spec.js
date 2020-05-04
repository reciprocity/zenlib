import DropdownMultiselect from "./DropdownMultiselect.vue";
import { shallowMount, mount } from "@vue/test-utils";
import VueMultiselect from "vue-multiselect";

describe("DropdownMultiselect.vue", () => {
  const options = [
    {
      label: "Open",
      value: 1
    },
    {
      label: "Closed",
      value: 2
    }
  ];

  it("inits with zero options", () => {
    const wrapper = shallowMount(DropdownMultiselect, {}).find(VueMultiselect);
    expect(wrapper.vm.options.length).toBe(0);
  });

  it("should pass props down to the VueMultiselect component", () => {
    const wrapper = shallowMount(DropdownMultiselect, {
      propsData: {
        options
      }
    }).find(VueMultiselect);

    expect(wrapper.vm.options).toEqual(options);
  });

  it("should know if a value is selected or not", () => {
    const wrapper = mount(DropdownMultiselect, {
      propsData: {
        options,
        preselectedValues: [options[0]]
      }
    });

    expect(wrapper.vm.isSelected(1)).toBe(true);
    expect(wrapper.vm.isSelected(2)).toBe(false);
  });
});
