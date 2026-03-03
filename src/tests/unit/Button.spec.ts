import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { Button } from "@/components/button";

import { UiSize, UiColor } from "@/types";

describe("Button.vue", () => {
  it("рендерится с дефолтными пропсами", () => {
    const wrapper = mount(Button, { slots: { default: "Click me" } });

    expect(wrapper.text()).toBe("Click me");
    expect(wrapper.classes()).toContain("UiButton");
    expect(wrapper.classes()).toContain("--default-variant");
    expect(wrapper.classes()).toContain("--md-size");
    expect(wrapper.attributes("disabled")).toBeUndefined();
  });

  it("добавляет классы variant и size", () => {
    const wrapper = mount(Button, {
      props: { variant: UiColor.Success, size: UiSize.Lg },
      slots: { default: "Save" },
    });

    expect(wrapper.classes()).toContain("--success-variant");
    expect(wrapper.classes()).toContain("--lg-size");
  });

  it("эмитит событие click при клике", async () => {
    const wrapper = mount(Button);
    await wrapper.trigger("click");

    expect(wrapper.emitted()).toHaveProperty("click");
    expect(wrapper.emitted("click")?.length).toBe(1);
  });

  it("не эмитит click если disabled", async () => {
    const wrapper = mount(Button, { props: { disabled: true } });
    await wrapper.trigger("click");

    expect(wrapper.emitted("click")).toBeUndefined();
    expect(wrapper.attributes("disabled")).toBeDefined();
  });
});
