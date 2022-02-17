import styled from '@emotion/styled'

type AvatarProps = {
  name: string
}
const AvatarContainer = styled.div({
  background: '#F6CA65',
  padding: 8,
  borderRadius: 5,
  fontSize: 23,
  lineHeight: '27px',
  color: 'white',
  fontWeight: 'bold',
  textTransform: 'uppercase',
})

const Avatar = ({ name }: AvatarProps) => {
  const initials = name?.split(' ').map((part) => part.charAt(0))
  return <AvatarContainer>{initials}</AvatarContainer>
}

export default Avatar
