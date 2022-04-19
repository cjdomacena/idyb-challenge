import React from 'react';


const LoadingCard: React.FC = (): JSX.Element => {

  return (
    <div className="w-full flex text-white rounded-lg xl:flex-nowrap lg:flex-nowrap  flex-wrap h-auto animate-pulse">
      <div className="xl:ml-14 lg:ml-14 ml-0 xl:max-w-[600px] lg:max-w-[600px] w-full h-[245px] bg-secondary-bg rounded-l-lg "></div>
      <div className="flex-grow bg-secondary-bg  rounded-r-lg grid place-items-center "></div>
    </div>
  );
};

export default LoadingCard;
