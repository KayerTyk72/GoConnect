import React, { createContext, useContext, useEffect, useState, ReactNode, FC } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

type AuthContextType = {
  authUser: FirebaseAuthTypes.User | null;
  login: (email: string, password: string) => Promise<boolean>; // Thêm kiểu trả về boolean cho hàm login
  logout: () => Promise<boolean>; // Thêm kiểu trả về boolean cho hàm logout
};

const AuthContext = createContext<AuthContextType>({
  authUser: null,
  login: async () => false, // Khởi tạo hàm login trả về false mặc định
  logout: async () => false, // Khởi tạo hàm logout trả về false mặc định
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [authUser, setAuthUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setAuthUser(user);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => { // Đặt kiểu trả về là boolean
    try {
      await auth().signInWithEmailAndPassword(email, password);
      return true; // Trả về true khi đăng nhập thành công
    } catch (error) {
      console.error('Error logging in:', error);
      return false; // Trả về false khi đăng nhập thất bại
    }
  };

  const logout = async (): Promise<boolean> => { // Đặt kiểu trả về là boolean
    try {
      await auth().signOut();
      return true; // Trả về true khi đăng xuất thành công
    } catch (error) {
      console.error('Error logging out:', error);
      return false; // Trả về false khi đăng xuất thất bại
    }
  };

  return (
    <AuthContext.Provider value={{ authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};