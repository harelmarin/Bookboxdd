import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then(async (token) => {
          try {
            const response = await axios.post('http://localhost:8001/api/users', {
              id: token,
              email: user.email,
              name: user.displayName
            });
            setUser(user);
          setUserId(response.data.user_id); // Stocker l'`user_id`

            console.log('Response from server:', response.data)
          } catch (error) {
            console.error('Error creating or updating user:', error);
          }
        });
      } else {
        setUser(null);
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        const token = await user.getIdToken();

        const response = await axios.post('http://localhost:8001/api/users', {
          id: token,
          email: user.email,
          name: user.displayName
        });

        // Afficher l'ID utilisateur pour le débogage
        console.log('Response from server:', response.data);

        setUser(user);
        setUserId(response.data.user_id); // Stocker l'`user_id`
      } else {
        console.error('User is null after sign in');
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setUserId(null); // Réinitialiser l'`user_id`
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userId, handleGoogleSignIn, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
