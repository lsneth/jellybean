import { PostgrestError } from '@supabase/supabase-js';
import { useSupabase } from './useSupabase';

type Jellybean = { id: string; flavor: string };

export default function useFetchJellybeans(
  setJellybeans: (data: Jellybean[]) => void
) {
  const supabase = useSupabase();

  async function fetchJellybeans() {
    const {
      data,
      error,
    }: { data: Jellybean[] | null; error: PostgrestError | null } =
      await supabase.from('jellybeans').select().order('flavor');

    if (error) {
      console.error(`Error fetching jellybeans: ${error.message}`);
      alert(`Failed to fetch jellybeans: ${error.message}`);
      return;
    }

    setJellybeans(data ?? []);
  }

  return { fetchJellybeans };
}
