import { useState } from 'react';
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
  const [loading, setLoading] = useState<boolean>(false);
  const { deleteJellybean } = useDeleteJellybean({ fetchJellybeans });

  return (
    <div className="flex justify-between items-center gap-2 w-full">
      <p className="truncate">{jellybean.flavor}</p>
      <div className="shrink-0">
        <IconButton onClick={enderEditMode} icon="edit" />
        <IconButton
          onClick={() => {
            deleteJellybean({ id: jellybean.id, setLoading });
          }}
          icon="remove"
          loading={loading}
        />
      </div>
    </div>
  );
}
