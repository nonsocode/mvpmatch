import styled from '@emotion/styled'
import Avatar from './Avatar'

const UserInfoContainer = styled.div({
  display: 'inline-flex',
  fontWeight: 'bold',
  fontSize: 16,
  lineHeight: '19px',
  alignItems: 'center',
  columnGap: 11,
  color: '#005B96',
})

const UserName = ({ name }: { name: string }) => {
  return (
    <UserInfoContainer>
      <Avatar name={name} />
      {name}
    </UserInfoContainer>
  )
}

export default UserName
