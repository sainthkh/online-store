import React from 'react';
import logo from '../logo.png';
import { Link } from 'react-router-dom';
import { styled } from '@beanovia/theme';

type Props = {
  children: React.ReactNode;
}

export default ({ children }: Props) => (
  <Flexbox>
    <Menu>
      <Link to="/"><img src={logo} alt="Logo" /></Link>
    </Menu>
    <div>
      <div>AppBar</div>
      <div>{children}</div>
    </div>
  </Flexbox>
);

const Flexbox = styled.div({
  display: 'flex',
  minHeight: '100%',
})

const Menu = styled.div(({ theme: { colors }}) => ({
  background: colors.black,
  color: colors.white,
  minHeight: '100%',
}))