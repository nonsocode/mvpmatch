import styled from '@emotion/styled'
import { CSSProperties } from 'react'
import { Colors } from 'src/types/colors'

type CardProps = {
  variant?: CardVariant
  padding?: CSSProperties['padding']
}

type CardVariant = 'light' | 'blank'
const Card = styled.div<CardProps>(({ variant = 'white', padding = 20 }) => ({
  borderRadius: 10,
  padding,
  backgroundColor: variant === 'light' ? Colors.SECONDARY_LIGHT : 'white',
}))

export default Card
