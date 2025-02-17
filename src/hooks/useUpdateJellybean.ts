import { useSupabase } from './useSupabase';

type PropTypes = {
  fetchJellybeans: () => void;
};

export default function useUpdateJellybean({ fetchJellybeans }: PropTypes): {
  updateJellybean: ({
    flavor,
    id,
  }: {
    flavor: string;
    id: string;
  }) => Promise<void>;
} {
  const { supabase } = useSupabase();

  async function updateJellybean({
    flavor,
    id,
  }: {
    flavor: string;
    id: string;
  }): Promise<void> {
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
