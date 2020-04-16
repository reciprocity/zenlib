import ColorPicker from "./ColorPicker.vue";
import { shallowMount } from "@vue/test-utils";

jest.mock("@simonwep/pickr", () => {
  let value;
  return {
    create: () => {
      value = "";
      return {
        on: jest.fn(),
        destroy: jest.fn(),
        setColor: jest.fn().mockImplementation(color => {
          value = color;
        }),
        getColor: jest.fn().mockImplementation(() => ({
          toHEXA: () => ({
            toString: () => value
          })
        }))
      };
    }
  };
});

describe("ColorPicker", () => {
  it("should render", () => {
    const wrapper = shallowMount(ColorPicker, {
      propsData: {
        value: "#0099FF"
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("should emit input event when picking a color with pickr", () => {
    const wrapper = shallowMount(ColorPicker, {
      propsData: {
        value: "#0099FF"
      }
    });

    const callback = wrapper.vm.pickr.on.mock.calls[0][1];
    callback({ toHEXA: () => ({ toString: () => "#0000EE" }) });

    expect(wrapper.emitted().input[0][0]).toEqual("#0000EE");
  });

  it("should destroy pickr instance before unmounting", () => {
    const wrapper = shallowMount(ColorPicker, {
      propsData: {
        value: "#0099FF"
      }
    });

    expect(wrapper.vm.pickr.destroy).not.toHaveBeenCalled();
    wrapper.destroy();
    expect(wrapper.vm.pickr.destroy).toHaveBeenCalled();
  });

  it("should update pickr color after updating value prop", async () => {
    const wrapper = shallowMount(ColorPicker, {
      propsData: {
        value: "#0099FF"
      }
    });

    expect(wrapper.vm.pickr.setColor).not.toHaveBeenCalled();
    wrapper.setProps({ value: "#FF00FF" });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.pickr.setColor).toHaveBeenCalledWith("#FF00FF");
  });

  it("should update circle background with the selected color if valid", async () => {
    const wrapper = shallowMount(ColorPicker, {
      propsData: {
        value: "#0099FF"
      }
    });

    const circle = wrapper.find(".color-circle");
    expect(circle.attributes("style")).toEqual(
      "background-color: rgb(0, 153, 255);"
    );

    wrapper.setProps({ value: "#FF00FF" });
    await wrapper.vm.$nextTick();

    expect(circle.attributes("style")).toEqual(
      "background-color: rgb(255, 0, 255);"
    );

    wrapper.setProps({ value: "Invalid Color" });
    await wrapper.vm.$nextTick();

    expect(circle.attributes("style")).toEqual("");
  });
});
