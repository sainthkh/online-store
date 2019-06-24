import styled from '../utils/styled';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';

import Nav from './Nav';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});

Router.events.on('routeChangeError', () => {
  NProgress.done();
});

export default () => (
  <header>
    <HeaderTopWrap>
      <HeaderTop>
        <LogoBar>
          <Link href="#">
            <Logo><img src="/static/logo.png" /></Logo>
          </Link>
          <MobileIcons>
            <Link href="/login"><a><Icon icon={faUser} /></a></Link>
            <Link href="/cart"><a><Icon icon={faShoppingCart} /></a></Link>
          </MobileIcons>
        </LogoBar>
        <SearchBar>
          <SearchBoxWrap>
            <SearchBox type="text" placeholder="Search..." />
            <SearchButton><Icon icon={faSearch} /></SearchButton>
          </SearchBoxWrap>
        </SearchBar>
      </HeaderTop>
    </HeaderTopWrap>
    <Nav />
  </header>
)

const HeaderTopWrap = styled.div(({ theme: { spacing, breakpoints }}) => ({
  padding: spacing.small,
  paddingBottom: spacing.tiny,

  [breakpoints.tablet]: {
    padding: spacing.base,
    paddingBottom: spacing.small,
  },

  [breakpoints.desktop]: {
    maxWidth: 1200,
    margin: 'auto',
  },
}));

const HeaderTop = styled.div(({ theme: { breakpoints }}) => ({
  [breakpoints.tablet]: {
    display: 'flex',
  }
}));

const LogoBar = styled.div(({ theme: { spacing }}) => ({
  display: 'flex',
  marginBottom: spacing.tiny,
}));

const Logo = styled.a(({ theme: { breakpoints }}) => ({
  width: 150,

  [breakpoints.tablet]: {
    width: 200,
  },
}));

const MobileIcons = styled.div(({ theme: { breakpoints }}) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',

  [breakpoints.tablet]: {
    display: 'none',
  },
}));

const Icon = styled(FontAwesomeIcon)(
  {} as TemplateStringsArray, 
  ({ theme: { colors, spacing }}) => ({
    fontSize: 24,
    padding: `${spacing.xtiny}px ${spacing.tiny}px`,
    color: colors.darkgray,
  })
);

const SearchBar = styled.div(({ theme: { spacing, breakpoints }}) => ({
  [breakpoints.tablet]: {
    marginLeft: spacing.base,
    width: '100%',
  },

  [breakpoints.desktop]: {
    width: 550,
  },
}));

const SearchBoxWrap = styled.div(({ theme: {colors, spacing}}) => ({
  display: 'flex',
  padding: `${spacing.tiny}px ${spacing.small}px`,
  background: colors.gray,
  borderRadius: 4,
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
