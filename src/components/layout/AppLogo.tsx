import styled from '@emotion/styled'
import { Colors } from 'src/types/colors'
import Logo from '../Logo'

const LogoContainer = styled.div({
  gridArea: 'logo',
  justifyContent: 'center',
  alignItems: 'center',
  borderBottom: '2px solid #F3F6F9',
  display: 'flex',
  background: Colors.TERTIARY
})

const AppLogo = () => {
  return (
    <LogoContainer>
      <Logo />
    </LogoContainer>
  )
}

export default AppLogo
