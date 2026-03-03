import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { Chart } from "@/components/chart";
import type { Diagram } from "@/types";

describe("PieChart.vue", () => {
  const sectors: Diagram[] = [
    { name: "Red", color: "#ff0000", size: "40" },
    { name: "Blue", color: "#0000ff", size: "60" },
  ];

  it("рендерится без секторов", () => {
    const wrapper = mount(Chart);
    expect(wrapper.exists()).toBe(true);
    // Должен быть Pie компонент внутри
    expect(wrapper.find("canvas").exists()).toBe(true);
  });

  it("корректно вычисляет labels и datasets", () => {
    const wrapper = mount(Chart, { props: { sectors } });
    const vm = wrapper.vm as any;

    const labels = vm.data.labels;
    const dataset = vm.data.datasets[0];

    expect(labels).toEqual(["Red", "Blue"]);
    expect(dataset.data).toEqual([40, 60]);
    expect(dataset.backgroundColor).toEqual(["#ff0000", "#0000ff"]);
  });

  it("tooltip callbacks возвращают правильный текст", () => {
    const wrapper = mount(Chart, { props: { sectors } });
    const vm = wrapper.vm as any;

    const tooltipItem = { dataset: { data: [40, 60] }, dataIndex: 1 };
    const label = vm.options.plugins.tooltip.callbacks.label.call(
      vm,
      tooltipItem,
    );

    expect(label).toBe("Blue: 60%");
  });
});
