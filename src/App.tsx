import { useEffect, useState } from 'react'
import './app.css'
import useFetchJellybeans from './hooks/useFetchJellybeans'
import useInsertJellybean from './hooks/useInsertJellybean'
import useUpdateJellybean from './hooks/useUpdateJellybean'
import useDeleteJellybean from './hooks/useDeleteJellybean'

type Jellybean = { id: string; flavor: string }

function App() {
  const [jellybeans, setJellybeans] = useState<Jellybean[]>([])
  const [newJellybeanId, setNewJellybeanId] = useState<string>('')
  const [newJellybeanFlavor, setNewJellybeanFlavor] = useState<string>('')

  const { fetchJellybeans } = useFetchJellybeans(setJellybeans)
  const { insertJellybean } = useInsertJellybean(fetchJellybeans)
  const { updateJellybean } = useUpdateJellybean(fetchJellybeans)
  const { deleteJellybean } = useDeleteJellybean(fetchJellybeans)

  useEffect(() => {
    fetchJellybeans()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only want this to fetch on first render
  }, [])

  return (
    <>
      {jellybeans.map((jellybean) => (
        <div key={jellybean.id} className="jellybean">
          {newJellybeanId === jellybean.id ? (
            <form
              onSubmit={(e: React.FormEvent) => {
                e.preventDefault()
                updateJellybean({ flavor: newJellybeanFlavor, id: jellybean.id })
                setNewJellybeanFlavor('')
                setNewJellybeanId('')
              }}
            >
              <>
                <input type="text" value={newJellybeanFlavor} onChange={(e) => setNewJellybeanFlavor(e.target.value)} placeholder={jellybean.flavor} />
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
      ))}

      {newJellybeanId === 'new' ? (
        <form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault()
            insertJellybean(newJellybeanFlavor)
            setNewJellybeanFlavor('')
            setNewJellybeanId('')
          }}
        >
          <input type="text" value={newJellybeanFlavor} onChange={(e) => setNewJellybeanFlavor(e.target.value)} />
          <button type="submit">Submit New Jellybean</button>
        </form>
      ) : (
        <button onClick={() => setNewJellybeanId('new')}>Add New Jellybean</button>
      )}
    </>
  )
}

export default App
