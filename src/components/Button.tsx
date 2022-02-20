import styled from '@emotion/styled'

const StyledButton = styled.button({
  appearance: 'none',
  minHeight: 32,
  fontSize: 14,
  lineHeight: '16px',
  border: 'none',
  background: '#005B96',
  borderRadius: 5,
  padding: '8px 10px',
  color: 'white',
})
const Button = (props: JSX.IntrinsicElements['button']) => {
  return <StyledButton {...props} />
}

export default Button
