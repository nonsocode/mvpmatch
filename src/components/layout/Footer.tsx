import styled from '@emotion/styled'
import React from 'react'

const StyledFooter = styled.footer({
  display: 'flex',
  alignItems: 'center'
})
const PseudoAnchor = styled.a({
  color: '#005B96',
  fontWeight: 'bold',
  lineHeight: '19px',
})
const Footer = () => {
  return (
    <StyledFooter>
      <PseudoAnchor>Terms&Conditions | Privacy policy</PseudoAnchor>
    </StyledFooter>
  )
}

export default Footer
