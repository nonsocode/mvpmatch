import styled from '@emotion/styled'
import React, { PropsWithChildren } from 'react'

const Levels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
type Size = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const sizeMap: Record<Size, number> = {
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 18,
  h5: 16,
  h6: 14,
}

const heightMap: Record<Size, string> = {
  h1: '36px',
  h2: '32px',
  h3: '28px',
  h4: '22px',
  h5: '19px',
  h6: '16px',
}
type HeadingProps = {
  bold?: boolean
  el?: Size
  size?: Size
  muted?: boolean
}
const StyledHeading = styled.div<Required<HeadingProps>>(
  ({ size, bold, muted }) => ({
    fontWeight: bold ? 'bold' : 'normal',
    fontSize: sizeMap[size],
    lineHeight: heightMap[size],
    ...(muted && {
      color: '#7E8299',
    }),
  }),
)
const Heading = ({
  bold = true,
  el,
  size = 'h1',
  muted = false,
  children,
}: PropsWithChildren<HeadingProps>) => (
  <StyledHeading bold={bold} el={el || size} size={size} muted={muted}>
    {children}
  </StyledHeading>
)

export default Heading
