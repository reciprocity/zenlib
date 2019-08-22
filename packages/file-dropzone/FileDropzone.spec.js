import Vue from "vue";
import FileDropzone from "./FileDropzone";

describe("FileDropzone.vue", () => {
  const Constructor = Vue.extend(FileDropzone);

  const createVm = () => {
    return new Constructor().$mount();
  };

  it("should emit a file on drop", () => {
    const vm = createVm();
    const labelEl = vm.$el.querySelector("label");

    let inputValue = null;

    vm.$on("input", value => {
      inputValue = value;
    });

    expect(vm.isOver).toBe(false);

    labelEl.dispatchEvent(new Event("dragover"));

    expect(vm.isOver).toBe(true);

    labelEl.dispatchEvent(new Event("dragend"));

    expect(vm.isOver).toBe(false);

    const dropEvent = new Event("drop");
    dropEvent.dataTransfer = {
      files: ["file1"]
    };

    labelEl.dispatchEvent(dropEvent);

    expect(vm.isOver).toBe(false);
    expect(inputValue).toEqual("file1");
  });

  it("should emit a file on file browse", () => {
    const vm = createVm();
    const inputEl = vm.$el.querySelector("input[type=file]");

    let inputValue = null;

    vm.$on("input", value => {
      inputValue = value;
    });

    Object.defineProperty(inputEl, "files", {
      value: ["file1"],
      writable: false
    });
    inputEl.dispatchEvent(new Event("change"));

    expect(inputValue).toEqual("file1");
  });
});
