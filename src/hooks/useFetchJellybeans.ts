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
}: PropTypes) {
  const { supabase } = useSupabase();

  async function fetchJellybeans(
    setLoading: React.Dispatch<React.SetStateAction<boolean>> = () => {}
  ) {
    setLoading(true);
    const {
      data,
      error,
    }: { data: Jellybean[] | null; error: PostgrestError | null } =
      await supabase.from('jellybeans').select().order(sort, { ascending });

    if (error) {
      console.error(`Error fetching jellybeans: ${error.message}`);
      alert(`Failed to fetch jellybeans: ${error.message}`);
      setLoading(false);
      return;
    }

    setJellybeans(data ?? []);
    setLoading(false);
  }

  return { fetchJellybeans };
}
