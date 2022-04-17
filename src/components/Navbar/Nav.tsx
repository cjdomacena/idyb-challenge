import React from 'react';
import Logo from '../Logo';

type Props = {};

const Nav:React.FC<Props> = (props: Props) => {
  return (
    <nav className="p-4 container mx-auto">
      <Logo />
    </nav>
  );
};

export default Nav;
