import styled from '@emotion/styled'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { getUsers } from 'src/api/actions'
import { Colors } from 'src/types/colors'
import { Nullish } from 'src/types/presense'
import Avatar from '../Avatar'
import Container from '../Container'
import { Hamburger } from '../icons'
import UserName from '../UserName'

const HeaderContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
})
const Wrapper = styled.div({
  gridArea: 'header',
  borderBottom: '2px solid #F3F6F9',
  background: Colors.TERTIARY,
})

const Header = () => {
  const name = 'John Doe'

  const { data: users } = useQuery('users', getUsers)
  const userName: Nullish<string> = useMemo(() => {
    if (!users) return null
    const user = users[0]
    return `${user.firstName} ${user.lastName}`
  }, [users])
  
  return (
    <Wrapper>
      <HeaderContainer>
        <Hamburger />
        {userName && <UserName name={userName} />}
      </HeaderContainer>
    </Wrapper>
  )
}

export default Header
