import React from 'react';
import { signOut } from 'firebase/auth';
import { firebaseSignOut  } from '../../utilities/firebase'
import { terms } from '../../utilities/Utilities';
import { TermButton } from './TermButton';
import { signInWithGoogle, useUserState } from '../../utilities/firebase';


const SignInButton = () => (
  <button className="btn btn-secondary btn-sm"
      onClick={() => signInWithGoogle()}>
    Sign In
  </button>
);

export const SignOutButton = () => (
  <button className="btn btn-secondary btn-sm"
      onClick={() => firebaseSignOut()}>
    Sign Out
  </button>
);

export const TermSelector = ({term, setTerm}) => {
  const [user] = useUserState();
  console.log(user,'fff')
  return (
    <div className="btn-toolbar justify-content-between">
      <div className="btn-group">
      { 
        Object.values(terms).map(
          value => <TermButton key={value} term={value} setTerm={setTerm} checked={value === term} />
        )
      }
      </div>
      {user ? <SignOutButton /> : <SignInButton />}
    </div>
  );
};


