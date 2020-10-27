import Multiselect, { isEqual } from "./Multiselect.vue";
import { shallowMount, mount } from "@vue/test-utils";
import VueMultiselect from "vue-multiselect";

window.HTMLElement.prototype.scroll = jest.fn();

const options = [
  {
    value: "option1",
    label: "Option 1"
  },
  {
    value: "option2",
    label: "Option 2",
    disabled: true
  },
  {
    value: "option3",
    label: "Option 3"
  }
];

describe("Multiselect.vue", () => {
  it("isEqual() works", () => {
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual(1, "1")).toBe(false);
    expect(isEqual("one", "one")).toBe(true);
    expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(isEqual({ 0: 1, 1: 1 }, [1, 1])).toBe(false);
    expect(
      isEqual({ a: 1, b: { a: 1, b: 2 } }, { a: 1, b: { a: 1, b: 2 } })
    ).toBe(true);
    expect(
      isEqual({ a: 1, b: { a: 1, b: 2 } }, { a: 1, b: { a: 1, b: 2, c: 3 } })
    ).toBe(false);
    expect(isEqual({ a: 1, b: [] }, { a: 1, b: [1, 2] })).toBe(false);
  });

  it("isEqual() handles circular references", () => {
    let a = [1, 2, 3];
    let c = [1, 2, 3];
    a.push(c);
    c.push(a);
    expect(isEqual(a, a)).toBe(true);
  });

  describe("uses VueMultiselect", () => {
    it("renders a vue-multiselect component", () => {
      const wrapper = shallowMount(Multiselect);
      expect(wrapper.contains(VueMultiselect)).toBe(true);
    });

    it("should pass props down to the VueMultiselect component", () => {
      const wrapper = shallowMount(Multiselect, {
        propsData: {
          options,
          value: options[0]
        }
      }).find(VueMultiselect);

      expect(wrapper.vm.options).toEqual(options);
    });

    it("formats option objects to use $isDefault", () => {
      const wrapper = shallowMount(Multiselect, {
        propsData: {
          options,
          value: options[0]
        }
      }).find(VueMultiselect);

      const option = wrapper.vm.options[1];
      expect(option.$isDisabled).toBe(true);
      expect(option.disabled).toBeFalsy();
    });
  });

  describe("renders native select element", () => {
    it("renders a hidden select element if renderSelectElement is true", () => {
      const wrapper = mount(Multiselect, {
        propsData: {
          options,
          value: options[1],
          renderSelectElement: true
        },
        sync: false
      });

      expect(wrapper.contains("select.d-none")).toBe(true);
    });

    it("does not render select element if renderSelectElement is not provided", () => {
      const wrapper = mount(Multiselect, {
        propsData: {
          options,
          value: options[1]
        },
        sync: false
      });

      expect(wrapper.contains("select.d-none")).toBe(false);
    });

    it("renders selected option inside hidden select element", () => {
      const wrapper = mount(Multiselect, {
        propsData: {
          options,
          value: [options[0], options[2]],
          renderSelectElement: true
        },
        sync: false
      }).findAll("option");

      expect(wrapper.at(0).attributes("value")).toEqual("option1");
      expect(wrapper.at(1).attributes("value")).toEqual("option3");

      expect(wrapper.at(0).text()).toEqual("Option 1");
      expect(wrapper.at(1).text()).toEqual("Option 3");
    });
  });

  describe("clear button", () => {
    jest.useFakeTimers();

    it("shows a clear button if a value is set", () => {
      const wrapper = mount(Multiselect, {
        propsData: {
          options,
          value: options[1]
        },
        sync: false
      }).find(".multiselect__clear-button");

      expect(wrapper.isVisible()).toBe(true);
    });

    it("does not show clear button if value not set", () => {
      const wrapper = mount(Multiselect, {
        propsData: {
          options
        },
        sync: false
      }).find(".multiselect__clear-button");

      expect(wrapper.isVisible()).toBe(false);
    });

    it("does not show clear button allowEmpty prop set to false", () => {
      const wrapper = mount(Multiselect, {
        propsData: {
          options,
          allowEmpty: false
        },
        sync: false
      }).find(".multiselect__clear-button");

      expect(wrapper.isVisible()).toBe(false);
    });

    it("clears selected values when clicking the clear button", () => {
      const wrapper = mount(Multiselect, {
        propsData: {
          options,
          sync: false
        }
      });

      expect(wrapper.emitted().input).toBeFalsy();

      const button = wrapper.find(".multiselect__clear-button");
      button.trigger("mousedown");

      const { input } = wrapper.emitted();

      expect(input).toBeTruthy();
      expect(input.length).toEqual(1);
      expect(input[0][0]).toEqual(null);
    });

    it("recalculates limit on change", async () => {
      const wrapper = mount(Multiselect, {
        propsData: {
          multiple: true,
          newFlag: true,
          options
        },
        value: [options[2], options[0]],
        sync: false
      });

      wrapper.vm.onChange();

      jest.runAllTimers();
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.myLimit).toBe(1);
    });

    it("recalculates limit on resize", async () => {
      const wrapper = mount(Multiselect, {
        propsData: {
          multiple: true,
          newFlag: true,
          options
        },
        value: [options[2], options[0]],
        sync: false
      });

      wrapper.vm.calcLimit = jest.fn();

      wrapper.vm.onResize({ width: 100 });

      jest.runAllTimers();
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.calcLimit).toHaveBeenCalled();
    });

    it("recalculates limit on close", async () => {
      const wrapper = mount(Multiselect, {
        propsData: {
          multiple: true,
          newFlag: true,
          options
        },
        value: [options[2], options[0]]
      });

      wrapper.vm.calcLimit = jest.fn();

      wrapper.vm.onClose();

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.calcLimit).toHaveBeenCalled();
    });

    it("reorders options on open", async () => {
      const wrapper = mount(Multiselect, {
        propsData: {
          multiple: true,
          newFlag: true,
          options
        },
        sync: false
      });

      expect(wrapper.vm.myOptions[0].label).toBe(options[0].label);

      wrapper.setProps({
        value: [options[2], options[1]]
      });

      expect(wrapper.vm.myOptions[0].label).toBe(options[0].label);

      wrapper.vm.onOpen();
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.myOptions[0].label).toBe(options[1].label);
      expect(wrapper.vm.myOptions[1].label).toBe(options[2].label);
      expect(wrapper.vm.myOptions[2].label).toBe(options[0].label);
    });

    it("clears selected values for instances with multiple prop", () => {
      const wrapper = mount(Multiselect, {
        propsData: {
          multiple: true,
          options
        },
        sync: false
      });

      expect(wrapper.emitted().input).toBeFalsy();

      const button = wrapper.find(".multiselect__clear-button");
      button.trigger("mousedown");

      const { input } = wrapper.emitted();

      expect(input).toBeTruthy();
      expect(input.length).toEqual(1);
      expect(input[0][0]).toEqual([]);
    });
  });

  describe("slots", () => {
    it("renders custom content inside the named clear slot", () => {
      const wrapper = mount(Multiselect, {
        propsData: {
          options
        },
        slots: {
          clear: '<div class="slot-content" />'
        },
        sync: false
      });

      expect(wrapper.contains(".slot-content")).toBe(true);
    });
  });

  describe("renders validation classes", () => {
    it("renders classes depending on the valid prop", async () => {
      const wrapper = shallowMount(Multiselect);
      const multiselect = wrapper.find(VueMultiselect);

      expect(multiselect.attributes("class")).toEqual("");

      wrapper.setProps({ valid: true });
      await wrapper.vm.$nextTick();

      expect(multiselect.attributes("class")).toEqual("is-valid");

      wrapper.setProps({ valid: true });
      await wrapper.vm.$nextTick();

      expect(multiselect.attributes("class")).toEqual("is-valid");

      wrapper.setProps({ valid: false });
      await wrapper.vm.$nextTick();

      expect(multiselect.attributes("class")).toEqual("is-invalid");
    });
  });
});
