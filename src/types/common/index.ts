export type StatusCircle = 'in-progress'|'success'|'warning'|'error'
export type TypeCircle = 'circle'|'dashboard'

export type ButtonVariant = 'primary' | 'success' | 'warning' | 'error'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  variant: ButtonVariant,
  size?: ButtonSize,
  disabled?: boolean,
}

export enum Status {
  Default = 'default',
  InProgress = 'in-progress',
  Warning = 'warning',
  Success = 'success',
  Error = 'error',
}

export enum ProgressType {
  Circle = 'circle',
  Dashboard = 'dashboard',
}
