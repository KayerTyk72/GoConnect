// AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';

const fakeUserData = [
    { username: 'admin', password: '222', role: 'admin' },
    { username: 'user', password: '456', role: 'user' },
  ];

interface User {
    username: string;
    password: string;
    role: string;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => User | undefined;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => undefined,
    logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (username: string, password: string) => {
        const user = fakeUserData.find(user => user.username === username && user.password === password);
        // Kiểm tra đăng nhập ở đây
        if (user) {
            setUser(user);
        }
        return user;
    };
  
    const logout = () => {
      setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};