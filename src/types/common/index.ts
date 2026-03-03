export type StatusCircle = "in-progress" | "success" | "warning" | "error";
export type TypeCircle = "circle" | "dashboard";

export type ButtonVariant = Extract<
  StatusCircle | "default",
  "default" | "success" | "warning" | "error"
>;
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
}

export const Status = {
  Default: "default",
  InProgress: "in-progress",
  Warning: "warning",
  Success: "success",
  Error: "error",
} as const;

export type Status = (typeof Status)[keyof typeof Status];

export enum ProgressType {
  Circle = "circle",
  Dashboard = "dashboard",
}

export interface Diagram {
  color: string;
  name: string;
  size: string;
}
