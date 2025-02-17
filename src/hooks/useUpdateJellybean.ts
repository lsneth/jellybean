import { useSupabase } from './useSupabase';

type PropTypes = {
  fetchJellybeans: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function useUpdateJellybean({
  fetchJellybeans,
  setLoading,
}: PropTypes): {
  updateJellybean: ({
    flavor,
    id,
  }: {
    flavor: string;
    id: string;
  }) => Promise<void>;
} {
  const { supabase } = useSupabase({ setLoading });

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
