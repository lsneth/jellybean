import { useState } from "react";
import useInsertJellybean from "../hooks/useInsertJellybean";

export default function NewJellybeanForm({
  fetchJellybeans,
}: {
  fetchJellybeans: () => Promise<void>;
}) {
  const { insertJellybean } = useInsertJellybean(fetchJellybeans);
  const [newJellybeanId, setNewJellybeanId] = useState<string>("");
  const [newJellybeanFlavor, setNewJellybeanFlavor] = useState<string>("");

  return newJellybeanId === "new" ? (
    <form
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        insertJellybean(newJellybeanFlavor);
        setNewJellybeanFlavor("");
        setNewJellybeanId("");
      }}
    >
      <input
        type="text"
        value={newJellybeanFlavor}
        onChange={(e) => setNewJellybeanFlavor(e.target.value)}
      />
      <button type="submit">Submit New Jellybean</button>
    </form>
  ) : (
    <button onClick={() => setNewJellybeanId("new")}>Add New Jellybean</button>
  );
}
