import { useSupabase } from './useSupabase';

export default function useInsertJellybean(fetchJellybeans: () => void) {
  const { supabase } = useSupabase();

  async function insertJellybean(flavor: string) {
    const { error } = await supabase.from('jellybeans').insert({ flavor });

    if (error) {
      console.error(`Error inserting jellybean: ${error.message}`);
      alert(`Failed to insert jellybean: ${error.message}`);
      return;
    }

    fetchJellybeans();
  }

  return { insertJellybean };
}
