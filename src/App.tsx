import { useEffect, useState } from "react";
import "./app.css";
import useFetchJellybeans from "./hooks/useFetchJellybeans";
import { Jellybean as JellybeanType } from "./types";
import Jellybean from "./components/Jellybean";
import NewJellybeanForm from "./components/NewJellybeanForm";

function App() {
  const [jellybeans, setJellybeans] = useState<JellybeanType[]>([]);
  const { fetchJellybeans } = useFetchJellybeans(setJellybeans);

  useEffect(() => {
    fetchJellybeans();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only want this to fetch on first render
  }, []);

  return (
    <>
      {jellybeans.map((jellybean) => (
        <Jellybean jellybean={jellybean} fetchJellybeans={fetchJellybeans} />
      ))}

      <NewJellybeanForm fetchJellybeans={fetchJellybeans} />
    </>
  );
}

export default App;
