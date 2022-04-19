import { createClient } from '@supabase/supabase-js';
import { SteamData } from '../interface';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY as string;
const SUPABASE_AUTH_KEY = process.env.REACT_APP_AUTH_KEY as string;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  headers: {
    Authorization: `Bearer ${SUPABASE_AUTH_KEY}`,
  },
});

export const getSteamGames = async (limit:number): Promise<SteamData[] | null> => {

  const {data, status, error} = await supabase.from<SteamData>('steam').select('*').limit(limit);
  if(status === 200) {
    return data
  } 
  return null
}