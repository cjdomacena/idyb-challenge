import React, {  useRef, useState } from 'react'
import TitleBar from './TitleBar';
import {ChevronDownIcon} from '@heroicons/react/solid'
import Card from '../Card';

type Props = {}

const Main = (props: Props) => {

  const [sort, setSort] = useState<string>("Price");
  const OPTIONS:string[] = ["Price", "Name"];
  const selectRef = useRef<HTMLSelectElement>(null)

  return (
    <section className="container mt-24 mx-auto p-4 ">
      <TitleBar />
      <div className="w-full mt-8 flex justify-between flex-wrap gap-4">
        <div className="xl:ml-14 lg:ml-14 ml-0 xl:w-fit lg:w-fit md:w-fit w-full text-white ">
          <input
            className="xl:w-[273px] lg:w-[273px] w-full rounded-full bg-secondary-bg p-2 xl:ml-2 lg:ml-2 ml-0 placeholder-[#8c9ca9] px-4 focus:ring-blue-300 focus:ring focus:outline-none placeholder:font-semibold appearance-none"
            placeholder="Search"
          />
        </div>
        <div className="xl:ml-14 lg:ml-14 ml-0 xl:w-fit lg:w-fit md:w-fit w-full text-white  ">
          <div className="flex items-center relative">
            <span className="mr-4 whitespace-nowrap">Sort By:</span>
            <div className="bg-secondary-bg rounded-full px-2 focus:ring-blue-300 focus:ring focus:outline-none placeholder:font-semibold xl:w-[273px] lg:w-[273px] w-full">
              <select
                className="w-full rounded-full pr-2 pl-0 py-2 placeholder-[#8c9ca9] cursor-pointer z-10  px-4 bg-secondary-bg focus:outline-none font-semibold"
                placeholder="Search"
                defaultValue="Price"
                ref={selectRef}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSort(e.currentTarget.value)
                }>
                {OPTIONS.map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-8 space-y-8">
        <Card />
        <Card />
      </div>
    </section>
  );
}

export default Main;