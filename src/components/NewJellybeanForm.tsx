import { useState } from 'react';
import useInsertJellybean from '../hooks/useInsertJellybean';
import IconButton from './IconButton';
import TextInput from './TextInput';
import JellybeanIcon from './JellybeanIcon';
import { colors } from '../constants/colors';

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
  const [currentColorIndex, setCurrentColorIndex] = useState<number>(0);

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
          color: colors[currentColorIndex % colors.length],
          setLoading,
          callback: () => setAddingOrEditing(undefined),
        });
        setNewJellybeanFlavor('');
      }}
      className="flex justify-center items-center gap-2"
    >
      <JellybeanIcon
        color={colors[currentColorIndex % colors.length]}
        editing
        incrementColor={() => setCurrentColorIndex((prev) => prev + 1)}
      />
      <TextInput
        value={newJellybeanFlavor}
        onChange={(e) => setNewJellybeanFlavor(e.target.value)}
        placeholder="Enter a flavor"
        squeeze
      />
      <div>
        <IconButton isSubmit icon="confirm" accent loading={loading} />
        <IconButton
          onClick={() => {
            setAddingOrEditing(undefined);
            setNewJellybeanFlavor('');
          }}
          icon="close"
          title="cancel"
        />
      </div>
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
