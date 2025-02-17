import { PostgrestError } from '@supabase/supabase-js';
import { useSupabase } from './useSupabase';

type Jellybean = { id: string; flavor: string };

type PropTypes = {
  setJellybeans: (data: Jellybean[]) => void;
  sort: 'flavor' | 'created_time';
  ascending: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function useFetchJellybeans({
  setJellybeans,
  sort,
  ascending,
  setLoading,
}: PropTypes): {
  fetchJellybeans: () => Promise<void>;
} {
  const { supabase } = useSupabase({ setLoading });

  async function fetchJellybeans(): Promise<void> {
    setLoading(true);
    const {
      data,
      error,
    }: { data: Jellybean[] | null; error: PostgrestError | null } =
      await supabase.from('jellybeans').select().order(sort, { ascending });
    setLoading(false);

    if (error) {
      console.error(`Error fetching jellybeans: ${error.message}`);
      alert(`Failed to fetch jellybeans: ${error.message}`);
      return;
    }

    setJellybeans(data ?? []);
  }

  return { fetchJellybeans };
}
