import styled from '@emotion/styled'
import { CSSProperties } from 'react'
import Card from './Card'
const LineCard =  styled(Card)<{
  justify?: CSSProperties['justifyContent']
}>(({ justify = 'space-between' }) => ({
  display: 'flex',
  justifyContent: justify,
}))


export default LineCard