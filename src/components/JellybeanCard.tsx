import { useState } from 'react';
import { Jellybean as JellybeanType } from '../types';
import UpdateJellybeanForm from './UpdateJellybeanForm';
import JellybeanControls from './JellybeanControls';

type PropTypes = {
  jellybean: JellybeanType;
  fetchJellybeans: () => Promise<void>;
};

export default function JellybeanCard({
  jellybean,
  fetchJellybeans,
}: PropTypes) {
  const [newJellybeanFlavor, setNewJellybeanFlavor] = useState<string>('');
  const [editingJellybeanId, setEditingJellybeanId] = useState<string>('');

  return (
    <div className="my-3 border border-neutral-50 rounded-lg p-5 max-w-xl mx-auto">
      {jellybean.id === editingJellybeanId ? (
        <UpdateJellybeanForm
          fetchJellybeans={fetchJellybeans}
          jellybeanId={jellybean.id}
          newJellybeanFlavor={newJellybeanFlavor}
          setNewJellybeanFlavor={setNewJellybeanFlavor}
          resetEditing={() => setEditingJellybeanId('')}
        />
      ) : (
        <JellybeanControls
          jellybean={jellybean}
          fetchJellybeans={fetchJellybeans}
          enderEditMode={() => {
            setEditingJellybeanId(jellybean.id);
            setNewJellybeanFlavor(jellybean.flavor);
          }}
        />
      )}
    </div>
  );
}
