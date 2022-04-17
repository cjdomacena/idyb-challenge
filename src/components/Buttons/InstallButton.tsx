import React from 'react'
import InstallSvg from '../SVG/InstallSvg';

type Props = {}

const InstallButton:React.FC<Props> = (props: Props) => {
  return (
    <button className="flex font-bold bg-[#214B6B] px-6 py-2 rounded-full hover:bg-secondary-bg transition-colors">
      <InstallSvg className="w-6 h-6 mr-2" />
      Install
    </button>
  );
}

export default InstallButton;