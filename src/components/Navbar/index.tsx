import React from 'react';
import Nav from './Nav';

type Props = {};

const Navbar = (props: Props) => {
  return (
    <header className="w-full h-auto text-white">
      <Nav />
    </header>
  );
};

export default Navbar;
