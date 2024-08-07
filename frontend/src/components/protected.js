import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../firebase/authContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Si l'utilisateur n'est pas connecté, redirigez vers le home
  if (!user) {
    return <Navigate to="/" />;
  }

  // Sinon, affichez le composant
  return children;
};

export default ProtectedRoute;
