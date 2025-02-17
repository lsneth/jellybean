import { PostgrestError } from '@supabase/supabase-js';
import { useSupabase } from './useSupabase';
import { useLoading } from '../providers/LoadingProvider';

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
  const { setLoading } = useLoading();

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
