import React from 'react'
import {FaLinux, FaWindows, FaApple, FaQuestion} from 'react-icons/fa'

type Props = {
title: string,
image_url: string,
genres: string[],
price: number,
platform: string,
}

const Card = () => {



  const platformSvg = (platform:string) => {
    switch(platform){
      case 'Windows': 
        return <FaWindows className="w-10 h-10 text-secondary-bg" />;
      case 'Apple': 
        return <FaApple className="w-10 h-10 text-secondary-bg" />;
      case 'Linux': 
       return <FaLinux className="w-10 h-10 text-secondary-bg" />;
      default: 
        return <FaQuestion className="w-10 h-10 text-secondary-bg" />;
    }
  }

  return (
    <div className="w-full flex text-white rounded-lg xl:flex-nowrap lg:flex-nowrap md:flex-nowrap flex-wrap">
      <div className="xl:ml-14 lg:ml-14 ml-0">
        <img
          src="https://cdn.akamai.steamstatic.com/steam/apps/915810/capsule_616x353.jpg?t=1649315580"
          alt="something"
          className=" rounded-tl-lg rounded-bl-lg"
        />
      </div>
      <div className="w-full bg-[#17202d] rounded-r-lg grid place-items-center ">
        <div className="xl:px-20 lg:px-20 md:px-12  p-4 w-full xl:flex lg:flex md:flex block justify-between flex-wrap ">
          <div className="content flex-wrap">
            <div className="w-fit">
              <h3 className="text-2xl font-semibold">Shadow Warrior 3</h3>
              <ul className="flex space-x-2 text-sm text-neutral-400">
                <li>Action, </li>
                <li>FPS, </li>
                <li>Adventure</li>
              </ul>
            </div>
            <hr className="border border-secondary-bg w-28 h-2 bg-secondary-bg mt-4 rounded-full" />
          </div>

          <div className="text-center xl:mt-0 lg:mt-0  mt-4 relative  justify-between items-center xl:block lg:block flex xl:w-fit lg:w-fit w-full">
            {platformSvg('Linux')}
            <div className="xl:absolute lg:absolute block -bottom-12 right-0">
              <h2 className="xl:text-4xl lg:text-4xl text-[40px] font-bold whitespace-nowrap">$ 29.00</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;