import { PostgrestError } from '@supabase/supabase-js';
import { useSupabase } from './useSupabase';

type Jellybean = { id: string; flavor: string };

type PropTypes = {
  setJellybeans: (data: Jellybean[]) => void;
  sort: 'flavor' | 'created_time';
  ascending: boolean;
};

export default function useFetchJellybeans({
  setJellybeans,
  sort,
  ascending,
}: PropTypes): {
  fetchJellybeans: () => Promise<void>;
} {
  const { supabase } = useSupabase();

  async function fetchJellybeans(): Promise<void> {
    const {
      data,
      error,
    }: { data: Jellybean[] | null; error: PostgrestError | null } =
      await supabase.from('jellybeans').select().order(sort, { ascending });

    if (error) {
      console.error(`Error fetching jellybeans: ${error.message}`);
      alert(`Failed to fetch jellybeans: ${error.message}`);
      return;
    }

    setJellybeans(data ?? []);
  }

  return { fetchJellybeans };
}
