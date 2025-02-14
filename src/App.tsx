import { useEffect, useState } from 'react';
import useFetchJellybeans from './hooks/useFetchJellybeans';
import { Jellybean as JellybeanType } from './types';
import JellybeanCard from './components/JellybeanCard';
import NewJellybeanForm from './components/NewJellybeanForm';
import IconButton from './components/IconButton';
import SortButtons from './components/SortButtons';

function App() {
  const [jellybeans, setJellybeans] = useState<JellybeanType[]>([]);
  const [sort, setSort] = useState<'created_time' | 'flavor'>('created_time');
  const [ascending, setAscending] = useState<boolean>(true);
  const { fetchJellybeans } = useFetchJellybeans({
    setJellybeans: setJellybeans,
    sort: sort,
    ascending: ascending,
  });
  const [addingOrEditing, setAddingOrEditing] = useState<
    'adding' | 'editing' | undefined
  >();

  useEffect(() => {
    fetchJellybeans();
  }, [ascending, sort]);

  return (
    <div className="text-center flex flex-col justify-between h-full">
      <div>
        <img src={'./logo.png'} className="max-w-56 mx-auto mt-10" />
        <h1 className="text-center text-5xl mb-10">jellybean</h1>
      </div>

      {jellybeans.length > 1 ? (
        <SortButtons
          sort={sort}
          toggleSort={() => {
            setSort((prev) =>
              prev === 'created_time' ? 'flavor' : 'created_time'
            );
          }}
          ascending={ascending}
          toggleAscending={() => {
            setAscending((prev) => !prev);
          }}
        />
      ) : (
        <></>
      )}

      <div>
        {jellybeans.map((jellybean, i) => (
          <JellybeanCard
            jellybean={jellybean}
            fetchJellybeans={fetchJellybeans}
            addingOrEditing={addingOrEditing}
            setAddingOrEditing={setAddingOrEditing}
            isLast={i === jellybeans.length - 1}
            key={jellybean.id}
          />
        ))}

        <div className="mt-10">
          <NewJellybeanForm
            fetchJellybeans={fetchJellybeans}
            addingOrEditing={addingOrEditing}
            setAddingOrEditing={setAddingOrEditing}
          />
        </div>
      </div>

      <p className="mt-50 pb-10">© Lucas Nethercott. All rights reserved.</p>
    </div>
  );
}

export default App;
