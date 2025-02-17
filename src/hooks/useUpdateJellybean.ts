import { useSupabase } from './useSupabase';

type PropTypes = {
  fetchJellybeans: () => void;
};

export default function useUpdateJellybean({ fetchJellybeans }: PropTypes) {
  const { supabase } = useSupabase();

  async function updateJellybean({
    flavor,
    id,
    setLoading,
    callback,
  }: {
    flavor: string;
    id: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    callback: () => void;
  }) {
    setLoading(true);
    const { error } = await supabase
      .from('jellybeans')
      .update({ flavor })
      .eq('id', id);

    if (error) {
      console.error(`Error updating jellybean: ${error.message}`);
      alert(`Failed to update jellybean: ${error.message}`);
      setLoading(false);
      return;
    }

    fetchJellybeans();
    callback();
    setLoading(false);
  }

  return { updateJellybean };
}
