import { useEffect, useState } from 'react'
import { createClient, PostgrestError } from '@supabase/supabase-js'
import './app.css'

const supabase = createClient('https://lbfcegnaffgqvbllwimf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiZmNlZ25hZmZncXZibGx3aW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0MjMyMzMsImV4cCI6MjA1NDk5OTIzM30.71ztpxWbFxUJwyGxNv451treAOI8NkPeREwSLhmNHyc')

type Jellybean = { id: string; flavor: string }

function App() {
  const [jellybeans, setJellybeans] = useState<Jellybean[]>([])

  useEffect(() => {
    fetchJellybeans()
  }, [])

  async function fetchJellybeans() {
    const { data, error }: { data: Jellybean[] | null; error: PostgrestError | null } = await supabase.from('jellybeans').select()

    if (error) {
      console.error('Error fetching jellybeans:', error.message)
      alert(`Failed to fetch jellybeans: ${error.message}`)
      return
    }

    setJellybeans(data ?? [])
  }

  async function insertJellybean() {
    const { error } = await supabase.from('jellybeans').insert({ flavor: 'pear' })

    if (error) {
      console.error('Error inserting jellybean:', error.message)
      alert(`Failed to insert jellybean: ${error.message}`)
      return
    }

    fetchJellybeans()
  }

  async function deleteJellybean(id: string) {
    const { error } = await supabase.from('jellybeans').delete().eq('id', id)

    if (error) {
      console.error('Error deleting jellybean:', error.message)
      alert(`Failed to delete jellybean: ${error.message}`)
      return
    }

    fetchJellybeans()
  }

  return (
    <>
      {jellybeans.map((jellybean) => (
        <div key={jellybean.id} className="jellybean">
          <p>{jellybean.flavor}</p>
          <button onClick={() => deleteJellybean(jellybean.id)}>Delete</button>
        </div>
      ))}
      <button onClick={insertJellybean}>Add pear jellybean</button>
    </>
  )
}

export default App
