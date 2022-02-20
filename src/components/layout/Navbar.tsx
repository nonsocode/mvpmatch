import styled from '@emotion/styled'
import { Icon } from 'src/types/icon'
import { NavLink, NavLinkProps } from 'react-router-dom'
import { FourSquares, Graph, Pie, Power, Screen } from '../icons'
import { Colors } from 'src/types/colors'
const Ul = styled.ul({
  padding: 0,
  listStyle: 'none',
  marginTop: 40,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  rowGap: 25,
})
const Nav = styled.nav({
  gridArea: 'nav',
  background: Colors.TERTIARY
})
const Li = styled.li({})
type NavItemkProps = {
  icon: Icon
  url: string
}
const NavItem = ({ icon: Icon, url }: NavItemkProps) => {
  return (
    <Li>
      <NavLink to={url}>
        {({ isActive }) => (
          <IconWrapper active={isActive}>
            <Icon />
          </IconWrapper>
        )}
      </NavLink>
    </Li>
  )
}

const IconWrapper = styled.span<{ active: boolean }>(({ active }) => ({
  display: 'inline-block',
  ...(!active && {
    filter: 'grayscale(1) opacity(0.5)',
  }),
}))

const Navbar = () => {
  return (
    <Nav>
      <Ul>
        <NavItem icon={Graph} url="/metrics" key="metrics"/>
        <NavItem icon={FourSquares} url="/dashboard" key="dashboard"/>
        <NavItem icon={Screen} url="/something" key="something"/>
        <NavItem icon={Pie} url="/reports" key="reports"/>
        <NavItem icon={Power} url="/settings" key="settings"/>
      </Ul>
    </Nav>
  )
}

export default Navbar
