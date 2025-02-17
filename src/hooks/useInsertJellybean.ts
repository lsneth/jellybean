import { useSupabase } from './useSupabase';

type PropTypes = {
  fetchJellybeans: () => void;
};

export default function useInsertJellybean({ fetchJellybeans }: PropTypes) {
  const { supabase } = useSupabase();

  async function insertJellybean({
    flavor,
    setLoading,
    callback,
  }: {
    flavor: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    callback: () => void;
  }) {
    setLoading(true);
    const { error } = await supabase.from('jellybeans').insert({ flavor });

    if (error) {
      console.error(`Error inserting jellybean: ${error.message}`);
      alert(`Failed to insert jellybean: ${error.message}`);
      setLoading(false);
      return;
    }

    fetchJellybeans();
    callback();
    setLoading(false);
  }

  return { insertJellybean };
}
