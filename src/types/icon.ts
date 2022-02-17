export type IconProps = {
  size?: IconSize
  primaryColor?: string,
  secondaryColor?: string,
  tertiaryColor?: string,
  className?: string,
}

export enum IconSize {
  SMALL = '11px',
  MEDIUM = '25px',
  LARGE = '31px'
}

export type Icon = (props: IconProps) => JSX.Element