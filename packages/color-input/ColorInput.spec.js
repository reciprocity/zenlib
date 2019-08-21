import ColorInput from "./ColorInput.vue";
import { shallowMount } from "@vue/test-utils";

jest.mock("@simonwep/pickr", () => {
  return {
    create: () => ({
      on: jest.fn(),
      destroy: jest.fn(),
      setColor: jest.fn()
    })
  };
});

describe("ColorInput", () => {
  it("should render", () => {
    const wrapper = shallowMount(ColorInput, {
      propsData: {
        value: "#0099FF"
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("should emit input event when picking a color with pickr", () => {
    const wrapper = shallowMount(ColorInput, {
      propsData: {
        value: "#0099FF"
      }
    });

    const callback = wrapper.vm.pickr.on.mock.calls[0][1];
    callback({ toHEXA: () => ({ toString: () => "#0000EE" }) });

    expect(wrapper.emitted().input[0][0]).toEqual("#0000EE");
  });

  it("should destroy pickr instance before unmounting", () => {
    const wrapper = shallowMount(ColorInput, {
      propsData: {
        value: "#0099FF"
      }
    });

    expect(wrapper.vm.pickr.destroy).not.toHaveBeenCalled();
    wrapper.destroy();
    expect(wrapper.vm.pickr.destroy).toHaveBeenCalled();
  });

  it("should update pickr color after updating value prop", () => {
    const wrapper = shallowMount(ColorInput, {
      propsData: {
        value: "#0099FF"
      }
    });

    expect(wrapper.vm.pickr.setColor).not.toHaveBeenCalled();
    wrapper.setProps({ value: "#FF00FF" });
    expect(wrapper.vm.pickr.setColor).toHaveBeenCalledWith("#FF00FF");
  });

  it("should update circle background with the selected color if valid", () => {
    const wrapper = shallowMount(ColorInput, {
      propsData: {
        value: "#0099FF"
      }
    });

    const circle = wrapper.find(".color-circle");
    expect(circle.attributes("style")).toEqual(
      "background-color: rgb(0, 153, 255);"
    );

    wrapper.setProps({ value: "#FF00FF" });

    expect(circle.attributes("style")).toEqual(
      "background-color: rgb(255, 0, 255);"
    );

    wrapper.setProps({ value: "Invalid Color" });

    expect(circle.attributes("style")).toEqual("");
  });
});
