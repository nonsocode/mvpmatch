import styled from '@emotion/styled'
import { Colors } from 'src/types/colors'
import Avatar from '../Avatar'
import Container from '../Container'
import { Hamburger } from '../icons'

const HeaderContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
})
const Wrapper = styled.div({
  gridArea: 'header',
  borderBottom: '2px solid #F3F6F9',
  background: Colors.TERTIARY
})
const UserInfoContainer = styled.div({
  display: 'inline-flex',
  fontWeight: 'bold',
  fontSize: 16,
  lineHeight: '19px',
  alignItems: 'center',
  columnGap: 11,
  color: '#005B96',
})
const Header = () => {
  const name = 'John Doe'
  return (
    <Wrapper>
      <HeaderContainer>
        <Hamburger />
        <UserInfoContainer>
          <Avatar name={name} />
          {name}
        </UserInfoContainer>
      </HeaderContainer>
    </Wrapper>
  )
}

export default Header
