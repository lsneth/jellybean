import { useSupabase } from './useSupabase';

type PropTypes = {
  fetchJellybeans: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function useInsertJellybean({
  fetchJellybeans,
  setLoading,
}: PropTypes): {
  insertJellybean: (flavor: string) => Promise<void>;
} {
  const { supabase } = useSupabase({ setLoading });

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
