import { useState } from 'react';
import { Jellybean as JellybeanType } from '../types';
import UpdateJellybeanForm from './UpdateJellybeanForm';
import JellybeanControls from './JellybeanControls';
import JellybeanIcon from './JellybeanIcon';
import { colors } from '../constants/colors';

type PropTypes = {
  jellybean: JellybeanType;
  fetchJellybeans: () => Promise<void>;
  addingOrEditing: 'adding' | 'editing' | undefined;
  setAddingOrEditing: React.Dispatch<
    React.SetStateAction<'adding' | 'editing' | undefined>
  >;
  isLast: boolean;
};

export default function JellybeanCard({
  jellybean,
  fetchJellybeans,
  addingOrEditing,
  setAddingOrEditing,
  isLast,
}: PropTypes) {
  const [newJellybeanFlavor, setNewJellybeanFlavor] = useState<string>('');
  const [editingJellybeanId, setEditingJellybeanId] = useState<string>('');
  const [currentColorIndex, setCurrentColorIndex] = useState<number>(
    colors.indexOf(jellybean.color)
  );

  return (
    <div
      className={`${
        !isLast ? 'border-b' : ''
      } border-neutral-50 py-5 sm:px-5 flex gap-3 items-center`}
    >
      <JellybeanIcon
        color={colors[currentColorIndex % colors.length]}
        editing={!!editingJellybeanId}
        incrementColor={() => setCurrentColorIndex((prev) => prev + 1)}
      />
      {jellybean.id === editingJellybeanId && addingOrEditing === 'editing' ? (
        <UpdateJellybeanForm
          fetchJellybeans={fetchJellybeans}
          jellybeanId={jellybean.id}
          newJellybeanFlavor={newJellybeanFlavor}
          newJellybeanColor={colors[currentColorIndex % colors.length]}
          setNewJellybeanFlavor={setNewJellybeanFlavor}
          resetEditing={() => {
            setAddingOrEditing(undefined);
            setEditingJellybeanId('');
          }}
        />
      ) : (
        <JellybeanControls
          jellybean={jellybean}
          fetchJellybeans={fetchJellybeans}
          enderEditMode={() => {
            setAddingOrEditing('editing');
            setEditingJellybeanId(jellybean.id);
            setNewJellybeanFlavor(jellybean.flavor);
          }}
        />
      )}
    </div>
  );
}
