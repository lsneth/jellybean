import { useSupabase } from './useSupabase';

export default function useDeleteJellybean(fetchJellybeans: () => void) {
  const { supabase } = useSupabase();

  async function deleteJellybean(id: string) {
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
