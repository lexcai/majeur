import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const login = (userData, token) => {
    setUser({ userData, token });
  };
  const logout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    setUser(null);
    router.push('/ui/sign-in');
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
