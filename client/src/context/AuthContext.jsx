// export default AuthProvider;

import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    loading: true,
    token: null,
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role'); // ✅ Get role from localStorage

    const fetchUserData = async () => {
      try {
        if (token && userId && role) {
          const user = { id: userId, role }; // ✅ Use real role from storage
          setAuthState({
            loading: false,
            token,
            user,
          });
        } else {
          setAuthState({
            loading: false,
            token: null,
            user: null,
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setAuthState({
          loading: false,
          token: null,
          user: null,
        });
      }
    };

    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
