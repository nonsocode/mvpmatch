import { IconProps } from 'src/types/icon'
import { defaults } from './defaults'

export const CaretDown = ({
  primaryColor = defaults.tertiaryColor,
  size = defaults.size,
  className,
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 11L0.937823 0.499999L13.0622 0.5L7 11Z" fill={primaryColor}/>
    </svg>
  )
}
