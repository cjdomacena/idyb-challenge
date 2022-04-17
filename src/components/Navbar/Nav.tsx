import React from 'react';
import InstallButton from '../Buttons/InstallButton';
import Logo from '../Logo';

type Props = {};

const Nav: React.FC<Props> = (props: Props) => {
  return (
    <nav className="p-4 container mx-auto flex justify-between items-center">
      <Logo />
      <InstallButton />
    </nav>
  );
};

export default Nav;
