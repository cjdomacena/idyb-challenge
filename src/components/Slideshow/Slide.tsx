import React from 'react'

type Props = {
	image_url:string,
	alt?:string,
	position: string
}

const Slide = (props: Props) => {
  if (props.position === 'left') {
    return (
      <img
        src={props.image_url}
        className={`w-[616px] h-auto rounded-lg opacity-40 scale-75  xl:block lg:block hidden ease-linear transition-opacity duration-300 `}
        alt={props.alt}
        draggable={false}
      />
    );
  }
  else if (props.position === 'right') {
    return (
      <img
        src={props.image_url}
        className={`w-[616px] h-auto rounded-lg opacity-40 scale-75  xl:block lg:block hidden ease-linear transition-opacity duration-300`}
        alt={props.alt}
        draggable={false}
      />
    );
  }  return (
    <img
      src={props.image_url}
      className="w-[616px] h-auto rounded-lg shadow-xl scale-100 ease-linear transition-opacity duration-300"
      alt={props.alt}
      draggable={false}
    />
  );
};

export default Slide;