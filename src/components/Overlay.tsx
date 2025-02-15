import { useState } from 'react';
import AuthOverlayContent from './AuthOverlayContent';
import HelpOverlayContent from './HelpOverlayContent';
import IconButton from './IconButton';

type PropTypes = {
  showOverlay: 'help' | 'auth';
  closeOverlay: () => void;
};

export default function Overlay({ showOverlay, closeOverlay }: PropTypes) {
  const [userHasAccount, setUserHasAccount] = useState<boolean>(false);

  return (
    //   opaque overlay bg
    <div className="bg-neutral-800/90 absolute inset-0 z-10 flex items-center justify-center">
      {/* overlay window */}
      <div className="bg-neutral-900 w-md z-20 rounded-lg p-4">
        <div className="flex justify-between items-center w-full">
          <div className="w-[38px]" />
          <h2 className="text-2xl">
            {showOverlay === 'auth'
              ? userHasAccount
                ? 'Log In'
                : 'Create Account'
              : showOverlay === 'help'
              ? 'Welcome to jellybean!'
              : ''}
          </h2>
          <IconButton icon="close" onClick={closeOverlay} />
        </div>
        <div className="my-4">
          {showOverlay === 'auth' ? (
            <AuthOverlayContent
              userHasAccount={userHasAccount}
              toggleUserHasAccount={() => setUserHasAccount((prev) => !prev)}
              closeOverlay={closeOverlay}
            />
          ) : (
            <HelpOverlayContent />
          )}
        </div>
      </div>
    </div>
  );
}
