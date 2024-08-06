// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import axios from 'axios';
// Création du contexte
export const AuthContext = createContext();


// Fournisseur du contexte
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Observer les changements d'état d'authentification
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Nettoyer l'abonnement lors du démontage du composant
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      if (user) {
        // Obtenir le token Firebase
        const token = await user.getIdToken();
  
        // Envoyer les informations de l'utilisateur à votre backend
        await axios.post('http://localhost:8001/api/users', {
          id: token,
          email: user.email,
          name: user.displayName
        });
  
        setUser(user); // Mettez à jour l'état utilisateur
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
      setUser(null); // Réinitialiser l'état utilisateur
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, handleGoogleSignIn, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
