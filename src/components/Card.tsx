import styled from '@emotion/styled'
import { Colors } from 'src/types/colors'

type CardProps = {
  variant?: CardVariant
}

type CardVariant = 'light' | 'blank'
const Card = styled.div<CardProps>(({ variant = 'white' }) => ({
  borderRadius: 10,
  padding: 20,
  backgroundColor: variant === 'light' ? Colors.SECONDARY_LIGHT : 'white',
}))

export default Card
