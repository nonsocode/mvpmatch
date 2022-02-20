import styled from "@emotion/styled"
import { CSSProperties } from "react"

type TextProps = {
  as?: keyof JSX.IntrinsicElements
  bold?: boolean,
  padding?: CSSProperties['padding']
  margin?: CSSProperties['margin']
}

const Text = styled.p<TextProps>(({bold, padding = 0, margin = 0}) => ({
  fontWeight: bold ? 'bold' : 'regular',
  padding,
  margin
}))

export default Text