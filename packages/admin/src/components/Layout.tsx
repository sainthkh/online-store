import { styled } from '@beanovia/theme'
import { faBell, faBox, faChartLine, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import logo from '../logo.png'

interface ILayoutProps {
  children: React.ReactNode
}

type Props = RouteComponentProps<any> & ILayoutProps

const Layout = ({ location, children }: Props) => {
  const menu = [
    { path: '/', icon: faChartLine, name: 'Dashboard' },
    { path: '/products', icon: faBox, name: 'Products' },
  ]

  return (
    <Flexbox>
      <Menu>
        <Logo to='/'>
          <img src={logo} alt='Logo' />
        </Logo>
        {menu.map(({ path, icon, name }) => {
          return (
            <MenuItem to={path} key={name} current={path === location.pathname}>
              <Icon icon={icon} />
              {name}
            </MenuItem>
          )
        })}
      </Menu>
      <Content>
        <Appbar>
          <SearchBoxWrap>
            <SearchBox type='text' placeholder='Search...' />
            <SearchButton>
              <Icon icon={faSearch} />
            </SearchButton>
          </SearchBoxWrap>
          <UserMenu>
            <IconButton>
              <FontAwesomeIcon icon={faBell} />
            </IconButton>
            <IconButton>
              <FontAwesomeIcon icon={faUser} />
            </IconButton>
          </UserMenu>
        </Appbar>
        <Page>{children}</Page>
      </Content>
    </Flexbox>
  )
}

export default withRouter<Props, React.FC<Props>>(Layout)

const Flexbox = styled.div({
  display: 'flex',
  minHeight: '100vh',
})

const Logo = styled(Link)(({ theme: { spacing } }) => ({
  display: 'block',

  marginBottom: spacing.base,
  padding: spacing.base,
}))

const Menu = styled.div(({ theme: { colors } }) => ({
  background: colors.black,
  color: colors.white,

  minHeight: '100vh',
  width: 250,
}))

interface IMenuItemProps {
  current: boolean
}

const MenuItem = styled(Link, {
  shouldForwardProp: prop => prop !== 'current',
})<IMenuItemProps>(({ current, theme: { colors, spacing, text } }) => ({
  display: 'block',
  padding: `${spacing.small}px ${spacing.base}px`,

  background: current ? colors.primary : 'inherit',
  color: colors.white,
  ...text.h3,
  textDecoration: 'none',

  ':hover': {
    background: current ? colors.primary : colors.primary_dark,
  },
}))

const Icon = styled(FontAwesomeIcon)(({ theme: { spacing } }) => ({
  marginRight: spacing.small,
}))

const Content = styled.div(({ theme: { colors } }) => ({
  width: '100%',

  background: colors.gray,
}))

const Appbar = styled.div(({ theme: { colors, spacing } }) => ({
  display: 'flex',

  padding: `${spacing.tiny}px ${spacing.small}px`,

  background: colors.white,
  borderBottom: `2px solid ${colors.gray_dark}`,
}))

const SearchBoxWrap = styled.div(({ theme: { colors, spacing } }) => ({
  display: 'flex',

  borderRadius: 4,
  padding: `${spacing.tiny}px ${spacing.small}px`,
  width: 350,

  background: colors.gray,
}))

const SearchBox = styled.input({
  background: 'transparent',
  border: 'none',
  fontSize: 20,
  width: '100%',
})

const SearchButton = styled.button(({ theme: { spacing } }) => ({
  background: 'transparent',

  border: 'none',
  marginLeft: spacing.xtiny,
  padding: 0,

  svg: {
    fontSize: 20,
    padding: 0,
  },
}))

const UserMenu = styled.div({
  display: 'flex',
  marginLeft: 'auto',
})

const IconButton = styled.a(({ theme: { colors, spacing, text } }) => ({
  display: 'flex',

  alignItems: 'center',
  justifyContent: 'center',

  borderRadius: 20,
  height: 40,
  width: 40,

  color: colors.darkgray,
  ...text.h3,

  ':hover': {
    background: colors.gray,
    cursor: 'pointer',
  },
}))

const Page = styled.div(({ theme: { colors, spacing } }) => ({
  padding: `${spacing.small}px ${spacing.base}px ${spacing.large}px`,
}))
