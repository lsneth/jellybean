import { useEffect, useState } from 'react';
import useFetchJellybeans from './hooks/useFetchJellybeans';
import { Jellybean as JellybeanType } from './types';
import JellybeanCard from './components/JellybeanCard';
import NewJellybeanForm from './components/NewJellybeanForm';
import SortButtons from './components/SortButtons';
import Overlay from './components/Overlay';
import IconButton from './components/IconButton';
import { useSupabase } from './hooks/useSupabase';

function App() {
  const [jellybeans, setJellybeans] = useState<JellybeanType[]>([]);
  const [sort, setSort] = useState<'created_time' | 'flavor'>('created_time');
  const [ascending, setAscending] = useState<boolean>(true);
  const [showOverlay, setShowOverlay] = useState<'help' | 'auth' | undefined>(
    undefined
  );
  const { authenticated, logOutUser } = useSupabase();
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
  }, [ascending, sort, authenticated]);

  return (
    <div className="h-full flex flex-col justify-between items-center">
      {!!showOverlay ? (
        <Overlay
          showOverlay={showOverlay}
          closeOverlay={() => setShowOverlay(undefined)}
        />
      ) : (
        <></>
      )}

      <div className="flex justify-between w-full items-start p-5">
        {/* this empty div is for even alignment */}
        <div className="w-[124px] sm:w-[84px]" />
        <div>
          <img src={'./logo.png'} className="max-w-36 sm:max-w-56 mx-auto" />
          <h1 className="text-center text-5xl mb-10 mt-5">jellybean</h1>
        </div>
        <div className="flex flex-wrap justify-end">
          <div className="max-[455px]:order-2">
            {authenticated ? (
              <IconButton icon="log out" onClick={logOutUser} />
            ) : (
              <IconButton
                icon="log in"
                onClick={() => setShowOverlay('auth')}
              />
            )}
          </div>
          <div className="max-[455px]:order-1">
            <IconButton icon="help" onClick={() => setShowOverlay('help')} />
          </div>
        </div>
      </div>

      <div className="text-center flex flex-col w-full sm:w-xl  px-5">
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

        {authenticated ? (
          <div className="mt-10">
            <NewJellybeanForm
              fetchJellybeans={fetchJellybeans}
              addingOrEditing={addingOrEditing}
              setAddingOrEditing={setAddingOrEditing}
            />
          </div>
        ) : (
          <p>Log in to continue</p>
        )}
      </div>

      <p className="mt-30 pb-7">© Lucas Nethercott. All rights reserved.</p>
    </div>
  );
}

export default App;
