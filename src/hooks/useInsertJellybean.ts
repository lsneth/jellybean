import { JellybeanColor } from '../types';
import { useSupabase } from './useSupabase';

type PropTypes = {
  fetchJellybeans: () => void;
};

export default function useInsertJellybean({ fetchJellybeans }: PropTypes) {
  const { supabase } = useSupabase();

  async function insertJellybean({
    flavor,
    color,
    setLoading,
    callback,
  }: {
    flavor: string;
    color: JellybeanColor;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    callback: () => void;
  }) {
    setLoading(true);
    const { error } = await supabase
      .from('jellybeans')
      .insert({ flavor, color });

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
