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

export const getSteamGames = async (limit: number, sortBy?:string): Promise<SteamData[] | null> => {

  if (sortBy === 'Name A - Z') {
    const { data, status, error } = await supabase
      .from<SteamData>('steam')
      .select('*')
      .order('title', { ascending: true })
      .limit(limit);
    if (status === 200) {
      return data;
    }
     if (error) {
       alert(error.message);
     }
    return null;
  } else if (sortBy === 'Name Z - A') {
    const { data, status, error } = await supabase
      .from<SteamData>('steam')
      .select('*')
      .order('title', { ascending: false })
      .limit(limit);
    if (status === 200) {
      return data;
    } 
    if(error) {
      alert(error.message)
    }
    return null;
  } else {
    const { data, status, error } = await supabase
      .from<SteamData>('steam')
      .select('*')
      .order('price', { ascending: false })
      .limit(limit);
    if (status === 200) {
      return data;
    }
     if (error) {
       alert(error.message);
     }
    return null;
  }
  
};


export const getQueriedGames = async(q:string) =>  {
  if(q.length > 0) {
    const { data, status, error } = await supabase
      .from<SteamData>('steam')
      .select('*')
      .textSearch('title', q, {
        type: 'plain',
      });
    if (status === 200) {
      return data;
    }
    if (error) {
      return null;
    }
  }
  return null;
}