import { useSupabase } from './useSupabase';

export default function useUpdateJellybean(fetchJellybeans: () => void) {
  const { supabase } = useSupabase();

  async function updateJellybean({
    flavor,
    id,
  }: {
    flavor: string;
    id: string;
  }) {
    const { error } = await supabase
      .from('jellybeans')
      .update({ flavor })
      .eq('id', id);

    if (error) {
      console.error(`Error updating jellybean: ${error.message}`);
      alert(`Failed to update jellybean: ${error.message}`);
      return;
    }

    fetchJellybeans();
  }

  return { updateJellybean };
}
