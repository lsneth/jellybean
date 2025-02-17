import { useSupabase } from './useSupabase';

type PropTypes = {
  fetchJellybeans: () => void;
};

export default function useDeleteJellybean({ fetchJellybeans }: PropTypes) {
  const { supabase } = useSupabase();

  async function deleteJellybean({
    id,
    setLoading,
  }: {
    id: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
    setLoading(true);
    const { error } = await supabase.from('jellybeans').delete().eq('id', id);

    if (error) {
      console.error(`Error deleting jellybean: ${error.message}`);
      alert(`Failed to delete jellybean: ${error.message}`);
      setLoading(false);
      return;
    }

    fetchJellybeans();
    setLoading(false);
  }

  return { deleteJellybean };
}
