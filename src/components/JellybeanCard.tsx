import { useState } from 'react';
import { Jellybean as JellybeanType } from '../types';
import UpdateJellybeanForm from './UpdateJellybeanForm';
import JellybeanControls from './JellybeanControls';

type PropTypes = {
  jellybean: JellybeanType;
  fetchJellybeans: () => Promise<void>;
  addingOrEditing: 'adding' | 'editing' | undefined;
  setAddingOrEditing: React.Dispatch<
    React.SetStateAction<'adding' | 'editing' | undefined>
  >;
  isLast: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function JellybeanCard({
  jellybean,
  fetchJellybeans,
  addingOrEditing,
  setAddingOrEditing,
  isLast,
  setLoading,
}: PropTypes) {
  const [newJellybeanFlavor, setNewJellybeanFlavor] = useState<string>('');
  const [editingJellybeanId, setEditingJellybeanId] = useState<string>('');

  return (
    <div
      className={`${!isLast ? 'border-b' : ''} border-neutral-50 py-5 sm:px-5`}
    >
      {jellybean.id === editingJellybeanId && addingOrEditing === 'editing' ? (
        <UpdateJellybeanForm
          fetchJellybeans={fetchJellybeans}
          jellybeanId={jellybean.id}
          newJellybeanFlavor={newJellybeanFlavor}
          setNewJellybeanFlavor={setNewJellybeanFlavor}
          resetEditing={() => {
            setAddingOrEditing(undefined);
            setEditingJellybeanId('');
          }}
          setLoading={setLoading}
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
          setLoading={setLoading}
        />
      )}
    </div>
  );
}
