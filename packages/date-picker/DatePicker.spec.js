import DatePicker from "./DatePicker.vue";
import { mount } from "@vue/test-utils";

describe("DatePicker", () => {
  it("should render", () => {
    const wrapper = mount(DatePicker, {
      propsData: {
        value: "1984-07-06"
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the date with the alternative format", () => {
    const wrapper = mount(DatePicker, {
      propsData: {
        value: "1984-07-06"
      }
    });
    const input = wrapper.find(".date-picker__input");
    expect(input.element.value).toEqual("07/06/1984");
  });

  it("renders the date with no alternative format", () => {
    const wrapper = mount(DatePicker, {
      propsData: {
        value: "1984-07-06",
        altInput: false
      }
    });
    const input = wrapper.find(".date-picker__input");
    expect(input.element.value).toEqual("1984-07-06");
  });

  it("renders the date with the alternative format using a different valueType", () => {
    const wrapper = mount(DatePicker, {
      propsData: {
        valueType: "timestamp",
        value: 1584113573374
      }
    });
    const input = wrapper.find(".date-picker__input");
    expect(input.element.value).toEqual("03/13/2020");
  });

  it("renders the date with the alternative format for ranges", () => {
    const wrapper = mount(DatePicker, {
      propsData: {
        value: ["1982-08-03", "1984-07-06"],
        range: true
      }
    });
    const input = wrapper.find(".date-picker__input");
    expect(input.element.value).toEqual("08/03/1982 ~ 07/06/1984");
  });
});
