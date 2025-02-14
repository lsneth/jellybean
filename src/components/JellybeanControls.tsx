import useDeleteJellybean from '../hooks/useDeleteJellybean';
import { Jellybean as JellybeanType } from '../types';
import IconButton from './IconButton';

type PropTypes = {
  jellybean: JellybeanType;
  fetchJellybeans: () => Promise<void>;
  enderEditMode: () => void;
};

export default function JellybeanControls({
  jellybean,
  fetchJellybeans,
  enderEditMode,
}: PropTypes) {
  const { deleteJellybean } = useDeleteJellybean(fetchJellybeans);

  return (
    <div className="flex justify-between items-center">
      <p>{jellybean.flavor}</p>
      <div>
        <IconButton onClick={enderEditMode} icon="pencil" />
        <IconButton
          onClick={() => deleteJellybean(jellybean.id)}
          icon="trash"
        />
      </div>
    </div>
  );
}
