import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import { Icon } from "@/components/icon/";

vi.mock("@/app/assets/images/Trash.svg", () => ({ default: "Trash.svg" }));
vi.mock("@/app/assets/images/Edit.svg", () => ({ default: "Edit.svg" }));

describe("Icon.vue", () => {
  it("рендерится", () => {
    const wrapper = mount(Icon, { props: { icon: "Trash.svg" } });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("img").exists()).toBe(true);
  });

  it("корректно подставляет src для Trash.svg", () => {
    const wrapper = mount(Icon, { props: { icon: "Trash.svg" } });
    const img = wrapper.find("img");
    expect(img.attributes("src")).toBe("Trash.svg");
  });

  it("корректно подставляет src для Edit.svg", () => {
    const wrapper = mount(Icon, { props: { icon: "Edit.svg" } });
    const img = wrapper.find("img");
    expect(img.attributes("src")).toBe("Edit.svg");
  });

  it("undefined для неизвестного icon", () => {
    const wrapper = mount(Icon, { props: { icon: "Unknown.svg" } });
    const img = wrapper.find("img");
    expect(img.attributes("src")).toBeUndefined();
  });
});
