import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://lbfcegnaffgqvbllwimf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiZmNlZ25hZmZncXZibGx3aW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0MjMyMzMsImV4cCI6MjA1NDk5OTIzM30.71ztpxWbFxUJwyGxNv451treAOI8NkPeREwSLhmNHyc')

function App() {
  const [jellybeans, setJellybeans] = useState([])

  useEffect(() => {
    getJellybeans()
  }, [])

  async function getJellybeans() {
    const { data } = await supabase.from('jellybeans').select()
    setJellybeans(data)
  }

  return (
    <ul>
      {jellybeans.map((jellybean) => (
        <li key={jellybean.id}>{jellybean.flavor}</li>
      ))}
    </ul>
  )
}

export default App
