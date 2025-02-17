import { useEffect, useState } from 'react';
import TextInput from './TextInput';
import IconButton from './IconButton';
import { useSupabase } from '../hooks/useSupabase';

type PropTypes = {
  closeOverlay: () => void;
  userHasAccount: boolean;
  toggleUserHasAccount: () => void;
};

export default function AuthOverlayContent({
  closeOverlay,
  userHasAccount,
  toggleUserHasAccount,
}: PropTypes) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { createUser, logInUser, authenticated } = useSupabase();

  // not usually a great use of useEffect, but in this case I thiiink it's justified.
  // because we're waiting on the response from supabase that the authentication succeeded (on log in or create account)
  useEffect(() => {
    if (authenticated) {
      closeOverlay();
    }
  }, [authenticated]);

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <form
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          if (!email.trim() || !password) {
            alert("You can't authenticate with empty credentials.");
            return;
          }

          userHasAccount
            ? logInUser({ email, password, setLoading })
            : createUser({ email, password, setLoading });
        }}
        className="flex flex-col items-center"
      >
        <p>Email</p>
        <TextInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="username"
        />
        <div className="m-2" />
        <p>Password</p>
        <TextInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autofocus={false}
        />
        <div className="m-2" />
        {userHasAccount ? (
          <IconButton icon="log in" isSubmit loading={loading} />
        ) : (
          <IconButton
            icon="add"
            isSubmit
            title="create account"
            loading={loading}
          />
        )}
      </form>

      <div className="flex items-center gap-1 mt-10">
        {userHasAccount ? (
          <p>New to jellybean?</p>
        ) : (
          <p>Already have an account?</p>
        )}
        <button
          onClick={() => {
            toggleUserHasAccount();
          }}
          className="underline cursor-pointer drop-shadow-xl"
        >
          {userHasAccount ? 'Create an account →' : 'Log in →'}
        </button>
      </div>
    </div>
  );
}
