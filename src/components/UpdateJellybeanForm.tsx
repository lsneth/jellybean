import useUpdateJellybean from '../hooks/useUpdateJellybean';
import TextInput from './TextInput';
import IconButton from './IconButton';

type PropTypes = {
  fetchJellybeans: () => Promise<void>;
  jellybeanId: string;
  newJellybeanFlavor: string;
  setNewJellybeanFlavor: React.Dispatch<React.SetStateAction<string>>;
  resetEditing: () => void;
};

export default function UpdateJellybeanForm({
  fetchJellybeans,
  jellybeanId,
  newJellybeanFlavor,
  setNewJellybeanFlavor,
  resetEditing,
}: PropTypes) {
  const { updateJellybean } = useUpdateJellybean(fetchJellybeans);
  return (
    <form
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        if (!newJellybeanFlavor.trim()) {
          alert('You cannot save an empty flavor.');
          return;
        }

        updateJellybean({ flavor: newJellybeanFlavor, id: jellybeanId });
        resetEditing();
      }}
      className="flex justify-between"
    >
      <TextInput
        value={newJellybeanFlavor}
        onChange={(e) => setNewJellybeanFlavor(e.target.value)}
        placeholder="Enter a flavor"
      />
      <IconButton isSubmit icon="confirm" />
    </form>
  );
}
