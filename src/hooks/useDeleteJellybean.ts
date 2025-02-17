import { useSupabase } from './useSupabase';

type PropTypes = {
  fetchJellybeans: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function useDeleteJellybean({
  fetchJellybeans,
  setLoading,
}: PropTypes): {
  deleteJellybean: (id: string) => Promise<void>;
} {
  const { supabase } = useSupabase({ setLoading });

  async function deleteJellybean(id: string): Promise<void> {
    const { error } = await supabase.from('jellybeans').delete().eq('id', id);

    if (error) {
      console.error(`Error deleting jellybean: ${error.message}`);
      alert(`Failed to delete jellybean: ${error.message}`);
      return;
    }

    fetchJellybeans();
  }

  return { deleteJellybean };
}
