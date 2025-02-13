import { useState } from "react";
import useDeleteJellybean from "../hooks/useDeleteJellybean";
import useUpdateJellybean from "../hooks/useUpdateJellybean";
import { Jellybean as JellybeanType } from "../types";

type PropTypes = {
  jellybean: JellybeanType;
  fetchJellybeans: () => Promise<void>;
};

export default function Jellybean({ jellybean, fetchJellybeans }: PropTypes) {
  const { updateJellybean } = useUpdateJellybean(fetchJellybeans);
  const { deleteJellybean } = useDeleteJellybean(fetchJellybeans);
  const [newJellybeanId, setNewJellybeanId] = useState<string>("");
  const [newJellybeanFlavor, setNewJellybeanFlavor] = useState<string>("");

  return (
    <div key={jellybean.id} className="jellybean">
      {newJellybeanId === jellybean.id ? (
        <form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            updateJellybean({ flavor: newJellybeanFlavor, id: jellybean.id });
            setNewJellybeanFlavor("");
            setNewJellybeanId("");
          }}
        >
          <>
            <input
              type="text"
              value={newJellybeanFlavor}
              onChange={(e) => setNewJellybeanFlavor(e.target.value)}
              placeholder={jellybean.flavor}
            />
            <button type="submit">Submit Edit</button>
          </>
        </form>
      ) : (
        <>
          <p>{jellybean.flavor}</p>
          <button onClick={() => setNewJellybeanId(jellybean.id)}>Edit</button>
          <button onClick={() => deleteJellybean(jellybean.id)}>Delete</button>
        </>
      )}
    </div>
  );
}
