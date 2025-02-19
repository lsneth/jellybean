import { useEffect, useState } from 'react';
import useFetchJellybeans from './hooks/useFetchJellybeans';
import { Jellybean as JellybeanType } from './types';
import JellybeanCard from './components/JellybeanCard';
import NewJellybeanForm from './components/NewJellybeanForm';
import SortButtons from './components/SortButtons';
import Overlay from './components/Overlay';
import IconButton from './components/IconButton';
import { useSupabase } from './hooks/useSupabase';
import { DotLoader } from 'react-spinners';

function App() {
  const [jellybeans, setJellybeans] = useState<JellybeanType[]>([]);
  const [sort, setSort] = useState<'created_time' | 'flavor'>(
    (localStorage.getItem('sort') as 'created_time' | 'flavor' | null) ??
      'created_time'
  );
  const [ascending, setAscending] = useState<boolean>(
    localStorage.getItem('ascending') === 'true'
  );
  const [showOverlay, setShowOverlay] = useState<'help' | 'auth' | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
  const [addingOrEditing, setAddingOrEditing] = useState<
    'adding' | 'editing' | undefined
  >();

  const { authenticated, logOutUser } = useSupabase();
  const { fetchJellybeans } = useFetchJellybeans({
    setJellybeans,
    sort,
    ascending,
  });

  useEffect(() => {
    // fetch jellybeans on initial load and whenever sorting or authentication changes
    fetchJellybeans(setLoading);
  }, [ascending, sort, authenticated]);

  useEffect(() => {
    // only show help dialogue on page load to probably new users
    if (!localStorage.getItem('returning_user')) {
      setShowOverlay('help');
      localStorage.setItem('returning_user', 'true');
    }
  }, []);

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

      <div className="w-full">
        <div className="flex justify-between w-full p-5 pb-2">
          <div>
            {/* these buttons are only here to be placeholders to keep everything centered in the flex box */}
            <IconButton icon="placeholder" />
            <IconButton icon="placeholder" />
          </div>

          <img src={'./logo.png'} className="max-w-24 sm:max-w-36 mx-auto" />

          <div className="">
            <IconButton icon="help" onClick={() => setShowOverlay('help')} />
            {authenticated ? (
              <IconButton
                icon="log out"
                onClick={() => logOutUser({ setLoading: setLogoutLoading })}
                loading={logoutLoading}
              />
            ) : (
              <IconButton
                icon="log in"
                onClick={() => setShowOverlay('auth')}
              />
            )}
          </div>
        </div>

        <img
          src={'./jellybean.png'}
          className="max-w-48 sm:max-w-64 mx-auto mb-10"
        />
      </div>

      <div className="text-center flex flex-col w-full sm:w-xl px-5">
        {loading ? (
          <DotLoader
            loading={loading}
            size={75}
            color="#fff"
            cssOverride={{ margin: '50px auto 200px' }}
          />
        ) : (
          <>
            {/* only show sort options if there is more than 1 jellybean */}
            {jellybeans.length > 1 ? (
              <SortButtons
                sort={sort}
                toggleSort={() => {
                  localStorage.setItem(
                    'sort',
                    sort === 'created_time' ? 'flavor' : 'created_time'
                  );
                  setSort((prev) =>
                    prev === 'created_time' ? 'flavor' : 'created_time'
                  );
                }}
                ascending={ascending}
                toggleAscending={() => {
                  localStorage.setItem('ascending', (!ascending).toString());
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
                isLast={i === jellybeans.length - 1} // don't render a line below the last item
                key={jellybean.id}
              />
            ))}

            {authenticated ? (
              <div className="mt-10">
                {/* helper instructions for when the jellybean array is empty */}
                {jellybeans.length === 0 ? (
                  addingOrEditing ? (
                    <p className="mb-6">
                      Type a flavor and choose a jellybean color
                    </p>
                  ) : (
                    <p className="mb-6">Use the "+" button to add a flavor</p>
                  )
                ) : (
                  <></>
                )}
                <NewJellybeanForm
                  fetchJellybeans={fetchJellybeans}
                  addingOrEditing={addingOrEditing}
                  setAddingOrEditing={setAddingOrEditing}
                />
              </div>
            ) : (
              <div className="flex gap-1 justify-center">
                <button
                  onClick={() => setShowOverlay('auth')}
                  className="cursor-pointer underline"
                >
                  Log in
                </button>
                <p>to continue</p>
              </div>
            )}
          </>
        )}
      </div>

      <p className="mt-25 pb-7">© Lucas Nethercott. All rights reserved.</p>
    </div>
  );
}

export default App;
