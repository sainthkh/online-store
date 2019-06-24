import React from 'react';
import logo from '../logo.png';
import { Link } from 'react-router-dom';
import { styled } from '@beanovia/theme';
import { withRouter, RouteComponentProps } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faBox } from '@fortawesome/free-solid-svg-icons';

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
          return <MenuItem to={path} current={path == location.pathname}><Icon icon={icon} />{name}</MenuItem>
        })}
      </Menu>
      <div>
        <div>AppBar</div>
        <div>{children}</div>
      </div>
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

const Menu = styled.div(({ theme: { colors, spacing }}) => ({
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
    background: current ? colors.primary : colors.primary_D40,
  }
}))

const Icon = styled(FontAwesomeIcon)(({ theme: { spacing } }) => ({
  marginRight: spacing.small,
}));
