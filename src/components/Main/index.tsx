import React, {  useEffect, useState } from 'react'
import TitleBar from './TitleBar';
import { SteamData } from '../../interface/index'
import Card from '../Card';
import { InfiniteData, useInfiniteQuery} from 'react-query'
import { getSteamGames } from '../../supabase';
import { useInView } from 'react-intersection-observer';
import LoadingCard from '../Card/LoadingCard';
import SearchInput from '../Search';

type Props = {}

const Main = (props: Props) => {
  const {ref, inView} = useInView({
    threshold: 1
  });
  const [sort, setSort] = useState<string>("Price");
  const [limit,setLimit] = useState<number>(5);
  const OPTIONS:string[] = ["Price", "Name A - Z", "Name Z - A"];

  const { data, isFetching, isError, isFetched, fetchNextPage } = useInfiniteQuery<
    SteamData[] | null,
    Error
  >(["initialList", sort], async ({pageParam = 5 }) => await getSteamGames(pageParam, sort), {
    staleTime: 1000 * 60,
  refetchOnWindowFocus: true,
  });


  const [currentList, setCurrentList] = useState<
    null | undefined | InfiniteData<SteamData[] | null>
  >(null);
 
  useEffect(() => {
        if (isFetched) {
          setCurrentList(data);
        }
        
  },[data, isFetched, limit])

  useEffect(() => {
    if (inView) {
        fetchNextPage({ pageParam: limit + 5 });
        setLimit((prev) => prev + 5);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);



  if (isError) {
    return <h1>Ooops... Something went wrong</h1>;
  }
  return (
    <main className="mt-24">
      <section className="container mx-auto p-4 ">
        <TitleBar />
        <div className="w-full mt-8 flex justify-between flex-wrap gap-4 relative">
          <SearchInput />
          <div className=" xl:w-fit lg:w-fit md:w-fit w-full text-white  ">
            <div className="flex items-center relative">
              <span className="mr-4 whitespace-nowrap">Sort By:</span>
              <div className="bg-secondary-bg rounded-full px-2 focus:ring-blue-300 focus:ring focus:outline-none placeholder:font-semibold xl:w-[273px] lg:w-[273px] w-full">
                <select
                  className="w-full rounded-full pr-2 pl-0 py-2 placeholder-[#8c9ca9] cursor-pointer z-10  px-4 bg-secondary-bg focus:outline-none font-semibold"
                  placeholder="Search"
                  defaultValue="Price"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setLimit(5);
                    setSort(e.currentTarget.value);
                  }}>
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
          {isFetching ? (
            <div className="space-y-8">
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </div>
          ) : null}
          {isFetched && data
            ? currentList?.pages[currentList?.pages.length - 1 ?? 0]?.map((item, index) => (
                <Card props={item} key={index} />
              ))
            : null}
        </div>
      </section>
      <div className="mx-auto w-fit my-6">
        {(currentList && currentList?.pages[currentList.pages.length - 1] === null) || undefined ? (
          <p>Nothing More to load</p>
        ) : (
          <div className="mt-12" ref={currentList ? ref : null}>
            <svg
              className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
      </div>
    </main>
  );
}

export default Main;