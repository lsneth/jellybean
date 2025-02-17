import { useSupabase } from './useSupabase';

type PropTypes = {
  fetchJellybeans: () => void;
};

export default function useInsertJellybean({ fetchJellybeans }: PropTypes): {
  insertJellybean: (flavor: string) => Promise<void>;
} {
  const { supabase } = useSupabase();

  async function insertJellybean(flavor: string): Promise<void> {
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
