import React from 'react';
import Header from './Header';
import Meta from './Meta';

type Props = {
  children: React.ReactNode;
}

export default ({ children }: Props) => {
  return (
    <div>
      <Meta />
      <Header />
      { children }
    </div>
  );
}
