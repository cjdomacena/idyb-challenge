export interface SteamData {
  id: number;
  link: string;
  image: string;
  title: string;
  price: number;
  tags: string[];
  platforms: string[];
  genre: string;
}
 
export interface IInfiniteQuery {
  nextCursor: number | undefined,
  page: {
    games: SteamData[],
    hasMore: boolean
  }
}