import React from 'react';
import logo from '../logo.png';
import { Link } from 'react-router-dom';
import { styled } from '@beanovia/theme';
import { withRouter, RouteComponentProps } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faBox, faSearch, faBell, faUser } from '@fortawesome/free-solid-svg-icons';

type LayoutProps = {
  children: React.ReactNode;
}

type Props = RouteComponentProps<any> & LayoutProps;

const Layout = ({ location, children }: Props) => {
  let menu = [
    { path: "/", icon: faChartLine, name: "Dashboard", },
    { path: "/products", icon: faBox, name:"Products", },
  ];

  return (
    <Flexbox>
      <Menu>
        <Logo to="/"><img src={logo} alt="Logo" /></Logo>
        { menu.map(({path, icon, name,}) => {
          return <MenuItem to={path} current={path === location.pathname}><Icon icon={icon} />{name}</MenuItem>
        })}
      </Menu>
      <Content>
        <Appbar>
          <SearchBoxWrap>
            <SearchBox type="text" placeholder="Search..." />
            <SearchButton><Icon icon={faSearch} /></SearchButton>
          </SearchBoxWrap>
          <UserMenu>
            <IconButton><FontAwesomeIcon icon={faBell} /></IconButton>
            <IconButton><FontAwesomeIcon icon={faUser} /></IconButton>
          </UserMenu>
        </Appbar>
        <Page>{children}</Page>
      </Content>
    </Flexbox>
  );
}

export default withRouter<Props>(Layout);

const Flexbox = styled.div({
  display: 'flex',
  minHeight: '100vh',
})

const Logo = styled(Link)(({theme: {spacing}}) => ({
  display: 'block',
  padding: spacing.base,
  marginBottom: spacing.base,
}))

const Menu = styled.div(({ theme: { colors }}) => ({
  background: colors.black,
  color: colors.white,
  width: 250,
  minHeight: '100vh',
}))

type MenuItemProps = {
  current: boolean,
};

const MenuItem = styled(Link)<MenuItemProps>(({current, theme: { colors, spacing, text }}) => ({
  display: 'block',
  padding: `${spacing.small}px ${spacing.base}px`,
  color: colors.white,
  ...text.h3,
  textDecoration: 'none',
  background: current ? colors.primary : 'inherit',

  ':hover': {
    background: current ? colors.primary : colors.primary_dark,
  }
}))

const Icon = styled(FontAwesomeIcon)(({ theme: { spacing } }) => ({
  marginRight: spacing.small,
}));

const Content = styled.div(({ theme: { colors }}) => ({
  width: '100%',
  background: colors.gray,
}))

const Appbar = styled.div(({ theme: { colors, spacing }}) => ({
  display: 'flex',
  padding: `${spacing.tiny}px ${spacing.small}px`,
  background: colors.white,
  borderBottom: `2px solid ${colors.gray_dark}`,
}));

const SearchBoxWrap = styled.div(({ theme: {colors, spacing}}) => ({
  display: 'flex',
  padding: `${spacing.tiny}px ${spacing.small}px`,
  background: colors.gray,
  borderRadius: 4,
  width: 350,
}));

const SearchBox = styled.input({
  background: 'transparent',
  border: 'none',
  fontSize: 20,
  width: '100%',
});

const SearchButton = styled.button(({theme: {spacing}}) => ({
  background: 'transparent',
  border: 'none',
  padding: 0,
  marginLeft: spacing.xtiny,

  svg: {
    fontSize: 20,
    padding: 0,
  },
}));

const UserMenu = styled.a({
  display: 'flex',
  marginLeft: 'auto',
});

const IconButton = styled.a(({ theme: { colors, spacing, text }}) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 40,
  height: 40,
  borderRadius: 20,
  color: colors.darkgray,
  ...text.h3,

  ':hover': {
    cursor: 'pointer',
    background: colors.gray,
  }
}))

const Page = styled.div(({ theme: { colors, spacing }}) => ({
  padding: `${spacing.small}px ${spacing.base}px ${spacing.large}px`,
}));
