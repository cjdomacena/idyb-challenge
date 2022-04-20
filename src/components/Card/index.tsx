import React from 'react'
import {FaLinux, FaWindows, FaApple, FaQuestion} from 'react-icons/fa'
import { SteamData } from '../../interface';

interface GameData{
  props: SteamData
}


const Card: React.FC<GameData> = ({ props }: GameData): JSX.Element => {
  const platformSvg = (platform: string) => {
    switch (platform) {
      case 'Windows':
        return <FaWindows className="w-10 h-10 text-secondary-bg" />;
      case 'Apple':
        return <FaApple className="w-10 h-10 text-secondary-bg" />;
      case 'Linux':
        return <FaLinux className="w-10 h-10 text-secondary-bg" />;
      default:
        return <FaQuestion className="w-10 h-10 text-secondary-bg" />;
    }
  };

  return (
    <div className="w-full flex text-white xl:flex-nowrap lg:flex-nowrap flex-wrap items-center bg-[#17202D] rounded-lg relative">
      <img
        src={props.image}
        alt="something"
        className="xl:rounded-tl-lg xl:rounded-bl-lg lg:rounded-tl-lg lg:rounded-bl-lg md:rounded-t-lg sm:rounded-t-lg xs:rounded-t-lg h-[245px] xl:rounded-tr-none lg:rounded-tr-none
          xl:w-auto lg:w-auto w-full object-center object-cover"
      />
      <div className="w-full px-4 py-8 flex justify-between mx-2 flex-wrap gap-4">
        <div className="w-[450px]">
          <h1 className="text-2xl font-bold leading-loose">{props.title}</h1>
          <ul className="flex flex-wrap gap-1 text-sm text-neutral-300">
            {props.tags.map((tag, index) => {
              if (index < props.tags.length - 1) {
                return <li key={tag}>{tag}, </li>;
              } else {
                return <li key={tag}>{tag}</li>;
              }
            })}
          </ul>
          <hr className="mt-2 border-2 rounded-full border-secondary-bg w-24" />
        </div>
          <p className="text-white">{platformSvg(props.platforms[0])}</p>
        <p className="text-3xl font-black absolute bottom-8 right-6">$ {props.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Card;