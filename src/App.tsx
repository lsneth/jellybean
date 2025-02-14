import { useEffect, useState } from 'react';
import useFetchJellybeans from './hooks/useFetchJellybeans';
import { Jellybean as JellybeanType } from './types';
import JellybeanCard from './components/JellybeanCard';
import NewJellybeanForm from './components/NewJellybeanForm';

function App() {
  const [jellybeans, setJellybeans] = useState<JellybeanType[]>([]);
  const { fetchJellybeans } = useFetchJellybeans(setJellybeans);

  useEffect(() => {
    fetchJellybeans();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only want this to fetch on first render
  }, []);

  return (
    <div className="text-center flex flex-col justify-between h-full">
      <div>
        <img src={'./logo.png'} className="max-w-56 mx-auto mt-10" />
        <h1 className="text-center text-5xl mb-10">jellybean</h1>
      </div>

      <div>
        {jellybeans.map((jellybean) => (
          <JellybeanCard
            jellybean={jellybean}
            fetchJellybeans={fetchJellybeans}
            key={jellybean.id}
          />
        ))}

        <NewJellybeanForm fetchJellybeans={fetchJellybeans} />
      </div>

      <p className="mt-50 pb-10">© Lucas Nethercott. All rights reserved.</p>
    </div>
  );
}

export default App;
