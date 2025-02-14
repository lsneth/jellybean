import { useState } from 'react';
import useInsertJellybean from '../hooks/useInsertJellybean';
import IconButton from './IconButton';
import TextInput from './TextInput';

type PropTypes = {
  fetchJellybeans: () => Promise<void>;
};

export default function NewJellybeanForm({ fetchJellybeans }: PropTypes) {
  const { insertJellybean } = useInsertJellybean(fetchJellybeans);
  const [addingJellybean, setAddingJellybean] = useState<boolean>(false);
  const [newJellybeanFlavor, setNewJellybeanFlavor] = useState<string>('');

  return addingJellybean ? (
    <form
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        insertJellybean(newJellybeanFlavor);
        setAddingJellybean(false);
        setNewJellybeanFlavor('');
      }}
      className="flex justify-center"
    >
      <TextInput
        value={newJellybeanFlavor}
        onChange={(e) => setNewJellybeanFlavor(e.target.value)}
      />
      <IconButton isSubmit icon="check" />
    </form>
  ) : (
    <IconButton onClick={() => setAddingJellybean(true)} icon="plus" />
  );
}
