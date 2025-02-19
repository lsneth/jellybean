import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const supabaseUrl = 'https://lbfcegnaffgqvbllwimf.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiZmNlZ25hZmZncXZibGx3aW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0MjMyMzMsImV4cCI6MjA1NDk5OTIzM30.71ztpxWbFxUJwyGxNv451treAOI8NkPeREwSLhmNHyc'; // this is okay to be exposed because the db is protected by RLS

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function useSupabase() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // subscribes to listen for authentication changes on initial render
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        setAuthenticated(true);
      } else if (event === 'SIGNED_OUT') {
        setAuthenticated(false);
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  async function createUser({
    email,
    password,
    setLoading,
  }: {
    email: string;
    password: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      console.error(`Error creating account: ${error.message}`);
      alert(`Failed to create account: ${error.message}`);
      return;
    }
  }

  async function logInUser({
    email,
    password,
    setLoading,
  }: {
    email: string;
    password: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      console.error(`Error logging in: ${error.message}`);
      alert(`Failed to log in: ${error.message}`);
      return;
    }
  }

  async function logOutUser({
    setLoading,
  }: {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);

    if (error) {
      if (error.status === 400) {
        // this is for the case that the user logs in from two different client types before the tokens expire
        // logout in this state is unsupported by supabase
        // to log out in this case, decided to just remove the auth token and set authenticated to false
        localStorage.removeItem('sb-lbfcegnaffgqvbllwimf-auth-token');
        setAuthenticated(false);
      } else {
        console.error(`Error logging out: ${error.message}`);
        alert(`Failed to log out: ${error.message}`);
      }
      return;
    }
  }

  return { supabase, createUser, logInUser, logOutUser, authenticated };
}
