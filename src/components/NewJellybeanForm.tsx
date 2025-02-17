import { useState } from 'react';
import useInsertJellybean from '../hooks/useInsertJellybean';
import IconButton from './IconButton';
import TextInput from './TextInput';

type PropTypes = {
  fetchJellybeans: () => Promise<void>;
  addingOrEditing: 'adding' | 'editing' | undefined;
  setAddingOrEditing: React.Dispatch<
    React.SetStateAction<'adding' | 'editing' | undefined>
  >;
};

export default function NewJellybeanForm({
  fetchJellybeans,
  addingOrEditing,
  setAddingOrEditing,
}: PropTypes) {
  const [loading, setLoading] = useState<boolean>(false);
  const { insertJellybean } = useInsertJellybean({
    fetchJellybeans,
  });
  const [newJellybeanFlavor, setNewJellybeanFlavor] = useState<string>('');

  return addingOrEditing === 'adding' ? (
    <form
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        if (!newJellybeanFlavor.trim()) {
          alert('You cannot save an empty flavor.');
          return;
        }
        insertJellybean({
          flavor: newJellybeanFlavor,
          setLoading,
          callback: () => setAddingOrEditing(undefined),
        });
        setNewJellybeanFlavor('');
      }}
      className="flex justify-center"
    >
      <TextInput
        value={newJellybeanFlavor}
        onChange={(e) => setNewJellybeanFlavor(e.target.value)}
        placeholder="Enter a flavor"
      />
      <IconButton isSubmit icon="confirm" accent loading={loading} />
    </form>
  ) : (
    <IconButton
      onClick={() => {
        setAddingOrEditing('adding');
        setNewJellybeanFlavor('');
      }}
      icon="add"
      accent
    />
  );
}
