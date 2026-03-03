import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { Input } from "@/components/input/";

describe("UiInputNumber.vue", () => {
  it("рендерится с пустым значением", () => {
    const wrapper = mount(Input, {
      props: { modelValue: "" },
    });
    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);
    expect(input.element.value).toBe("");
  });

  it("эмитит update:modelValue при вводе числа", async () => {
    const wrapper = mount(Input, { props: { modelValue: "" } });
    const input = wrapper.find("input");

    await input.setValue("50");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["50"]);
  });

  it("ограничивает число до 100", async () => {
    const wrapper = mount(Input, { props: { modelValue: "" } });
    const input = wrapper.find("input");

    await input.setValue("150");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["100"]);
  });

  it("ограничивает число до 0", async () => {
    const wrapper = mount(Input, { props: { modelValue: "" } });
    const input = wrapper.find("input");

    await input.setValue("-5");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["0"]);
  });

  it("эмитит change при изменении", async () => {
    const wrapper = mount(Input, { props: { modelValue: "" } });
    const input = wrapper.find("input");

    await input.setValue("42");
    await input.trigger("change");
    expect(wrapper.emitted("change")?.[0]).toEqual(["42"]);
  });

  it("эмитит focus и click", async () => {
    const wrapper = mount(Input, { props: { modelValue: "" } });
    const input = wrapper.find("input");

    await input.trigger("focus");
    expect(wrapper.emitted("focus")?.length).toBe(1);

    await input.trigger("click");
    expect(wrapper.emitted("click")?.length).toBe(1);
  });

  it("не работает при disabled", async () => {
    const wrapper = mount(Input, {
      props: { modelValue: "", disabled: true },
    });
    const input = wrapper.find("input");

    await input.setValue("50");
    expect(wrapper.emitted("update:modelValue")).toBeUndefined();

    await input.trigger("focus");
    expect(wrapper.emitted("focus")).toBeUndefined();
  });
});
