import React from 'react'

type Props = {}

const TitleBar = (props: Props) => {
  return (
    <div className="text-white">
      <div className="w-full overflow-hidden relative flex items-center">
        <hr className="w-[127px] h-2 rounded-full border-secondary-bg border-4 xl:-ml-20 lg:-ml-20 -ml-8 mr-2" />
        <h1 className=" text-3xl font-base whitespace-nowrap">New & Trending</h1>
        <hr className="xl:w-[127px] lg:w-[127px] w-full h-2 rounded-full border-secondary-bg border-4 ml-2" />
      </div>
    </div>
  );
}

export default TitleBar