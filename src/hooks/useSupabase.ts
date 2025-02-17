import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { useLoading } from '../providers/LoadingProvider';

const supabaseUrl = 'https://lbfcegnaffgqvbllwimf.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiZmNlZ25hZmZncXZibGx3aW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0MjMyMzMsImV4cCI6MjA1NDk5OTIzM30.71ztpxWbFxUJwyGxNv451treAOI8NkPeREwSLhmNHyc';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function useSupabase(): {
  supabase: SupabaseClient<any, 'public', any>;
  createUser: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  logInUser: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  logOutUser: () => Promise<void>;
  authenticated: boolean;
} {
  const { setLoading } = useLoading();
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
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
  }: {
    email: string;
    password: string;
  }): Promise<void> {
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
  }: {
    email: string;
    password: string;
  }): Promise<void> {
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

  async function logOutUser(): Promise<void> {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);

    if (error) {
      console.error(`Error logging out: ${error.message}`);
      alert(`Failed to log out: ${error.message}`);
      return;
    }
  }

  return { supabase, createUser, logInUser, logOutUser, authenticated };
}
