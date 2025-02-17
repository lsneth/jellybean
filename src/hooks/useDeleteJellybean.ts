import { useSupabase } from './useSupabase';

type PropTypes = {
  fetchJellybeans: () => void;
};

export default function useDeleteJellybean({ fetchJellybeans }: PropTypes): {
  deleteJellybean: (id: string) => Promise<void>;
} {
  const { supabase } = useSupabase();

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
