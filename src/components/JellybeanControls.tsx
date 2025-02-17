import useDeleteJellybean from '../hooks/useDeleteJellybean';
import { Jellybean as JellybeanType } from '../types';
import IconButton from './IconButton';

type PropTypes = {
  jellybean: JellybeanType;
  fetchJellybeans: () => Promise<void>;
  enderEditMode: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function JellybeanControls({
  jellybean,
  fetchJellybeans,
  enderEditMode,
  setLoading,
}: PropTypes) {
  const { deleteJellybean } = useDeleteJellybean({
    fetchJellybeans,
    setLoading,
  });

  return (
    <div className="flex justify-between items-center gap-2">
      <p className="truncate">{jellybean.flavor}</p>
      <div className="shrink-0">
        <IconButton onClick={enderEditMode} icon="edit" />
        <IconButton
          onClick={() => deleteJellybean(jellybean.id)}
          icon="remove"
        />
      </div>
    </div>
  );
}
