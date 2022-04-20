import React, { useEffect, useState } from 'react';
import { FaApple, FaLinux, FaQuestion, FaWindows } from 'react-icons/fa';
import { useQuery } from 'react-query';
import useDebounce from '../../hook/useDebounce';
import { SteamData } from '../../interface';
import { getQueriedGames } from '../../supabase';
type Props = {};

const SearchInput: React.FC = (props: Props) => {
  const [query, setQuery] = useState<string>('');
  const debouncedSearchTerm = useDebounce(query, 1000);
  const [searchResults, setSearchResults] = useState<SteamData[] | undefined | null>();
  const { data, isFetched, refetch, isRefetching } = useQuery(
    debouncedSearchTerm,
    async () => await getQueriedGames(debouncedSearchTerm),
    {
      staleTime: 1000 * 60,
	  refetchOnWindowFocus: false,
	  refetchOnMount:false
    },
  );

  useEffect(() => {
    refetch();
    setSearchResults(data);
  }, [debouncedSearchTerm, data, refetch]);

  const platformSvg = (platform: string) => {
    switch (platform) {
      case 'Windows':
        return <FaWindows className="w-10 h-10 text-primary-bg" />;
      case 'Apple':
        return <FaApple className="w-10 h-10 text-primary-bg" />;
      case 'Linux':
        return <FaLinux className="w-10 h-10 text-primary-bg" />;
      default:
        return <FaQuestion className="w-10 h-10 text-primary-bg" />;
    }
  };

  return (
    <div className=" xl:w-fit lg:w-fit md:w-fit w-full">
      <div className="xl:w-fit lg:w-fit md:w-fit w-full text-white relative">
        <input
          type="text"
          className="xl:w-[273px] lg:w-[273px] w-full rounded-full bg-secondary-bg p-2 xl:ml-2 lg:ml-2 ml-0 placeholder-[#8c9ca9] px-4 focus:ring-blue-300 focus:ring focus:outline-none placeholder:font-semibold appearance-none"
          placeholder="Search"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.currentTarget.value)}
        />
        {query.length > 0 ? (
          <button
            className="text-xs bg-slate-800 absolute right-4 top-2 px-2 py-1 rounded text-slate-400"
            onClick={() => setQuery('')}>
            Clear
          </button>
        ) : null}
      </div>
      {searchResults && debouncedSearchTerm.length > 1 ? (
        <div className="h-auto xl:ml-16 lg:ml-16 ml-0 mt-2  absolute top-10  w-full space-y-2  p-2  rounded z-50 overflow-y-auto bg-primary-bg shadow-xl border border-white/30">
          {isRefetching && query.length > 1 ? (
            <h1 className="text-white p-4 animate-pulse">Searching</h1>
          ) : null}
          {searchResults && !isRefetching && searchResults?.length > 0
            ? searchResults?.map((result) => (
                <div
                  className="w-full h-auto bg-secondary-bg rounded flex items-center flex-wrap p-4"
                  key={result.id}>
                  <img src={result.image} className="w-full max-w-[400px]" alt={result.title} />
                  <div className="p-4">
                    <div className="text-white flex justify-between flex-grow">
                      <div>
                        <a
                          href={result.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-neutral-400">
                          <h1 className="text-3xl font-semibold text-white hover:text-neutral-400 transition-colors">
                            {result.title}
                          </h1>
                        </a>
                        <ul className="text-sm flex space-x-1 mt-2">
                          {result.tags.map((tag, index) => {
                            if (index < result.tags.length - 1) {
                              return <li key={tag}>{tag}, </li>;
                            }
                            return <li key={tag}>{tag}</li>;
                          })}
                        </ul>
                      </div>
                    </div>
                    <p className="mt-4 text-2xl text-white font-black">$ {result.price}</p>
                    <div className="mt-4 justify-start mr-4">
                      {platformSvg(result.platforms[0])}
                    </div>
                  </div>
                </div>
              ))
            : null}
          {searchResults && searchResults?.length === 0 && isFetched ? (
            <h1 className="text-white p-4">No games found</h1>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default SearchInput;
