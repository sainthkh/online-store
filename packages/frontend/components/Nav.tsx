import Link from 'next/link'
import styled from '../utils/styled'

export default () => (
  <Background>
    <Wrap>
      <Main>
        <Link href='/women'>
          <LinkText>Women</LinkText>
        </Link>
        <Link href='/men'>
          <LinkText>Men</LinkText>
        </Link>
        <Link href='/jewelry'>
          <LinkText>Jewelry</LinkText>
        </Link>
        <Link href='/shoes'>
          <LinkText>Shoes</LinkText>
        </Link>
      </Main>
      <Side>
        <Link href='/login'>
          <LinkText>Login</LinkText>
        </Link>
        <Link href='/signup'>
          <LinkText>Sign up</LinkText>
        </Link>
        <Link href='/cart'>
          <LinkText>Cart</LinkText>
        </Link>
      </Side>
    </Wrap>
  </Background>
)

const Background = styled.div(({ theme: { colors, spacing } }) => ({
  padding: `${spacing.xtiny}px ${spacing.small}px`,
  background: colors.black,
}))

const Wrap = styled.ul(({ theme: { breakpoints } }) => ({
  display: 'flex',
  margin: 0,
  overflow: 'auto',
  whiteSpace: 'nowrap',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  paddingInlineStart: 0,

  [breakpoints.desktop]: {
    maxWidth: 1200,
    margin: 'auto',
  },
}))

const Main = styled.div({
  display: 'flex',
})

const Side = styled.div(({ theme: { breakpoints } }) => ({
  display: 'none',

  [breakpoints.tablet]: {
    display: 'flex',
    marginLeft: 'auto',
  },
}))

const LinkText = styled.a(({ theme: { colors, spacing } }) => ({
  display: 'block',
  padding: `${spacing.tiny}px ${spacing.small}px`,
  textDecoration: 'none',
  color: colors.white,
  fontSize: 20,
  borderRight: `1px solid ${colors.darkgray}`,
}))
