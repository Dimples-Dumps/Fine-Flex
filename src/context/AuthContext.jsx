import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing session
    const storedUser = localStorage.getItem('financialHealthUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing stored user:', e);
        localStorage.removeItem('financialHealthUser');
      }
    }
    setLoading(false);
  }, []);

  const register = (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Get existing users from localStorage
        const existingUsers = JSON.parse(localStorage.getItem('financialHealthUsers') || '[]');
        
        // Check if email already exists
        if (existingUsers.some(user => user.email === email)) {
          reject(new Error('Email already registered. Please login instead.'));
          return;
        }
        
        // Create new user
        const newUser = {
          id: Date.now().toString(),
          name,
          email,
          password, // In a real app, this should be hashed
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0096D1&color=fff&bold=true&size=100`,
          createdAt: new Date().toISOString()
        };
        
        // Save to users list
        existingUsers.push(newUser);
        localStorage.setItem('financialHealthUsers', JSON.stringify(existingUsers));
        
        // Auto login after registration
        const userData = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          avatar: newUser.avatar,
          createdAt: newUser.createdAt
        };
        
        setUser(userData);
        localStorage.setItem('financialHealthUser', JSON.stringify(userData));
        resolve(userData);
      }, 500);
    });
  };

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('financialHealthUsers') || '[]');
        
        // Find user with matching email and password
        const foundUser = users.find(user => user.email === email && user.password === password);
        
        if (foundUser) {
          const userData = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            avatar: foundUser.avatar,
            createdAt: foundUser.createdAt
          };
          setUser(userData);
          localStorage.setItem('financialHealthUser', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('financialHealthUser');
    // Note: We don't remove questionnaire answers so data persists across logins
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('financialHealthUser', JSON.stringify(updatedUser));
    
    // Also update in users list
    const users = JSON.parse(localStorage.getItem('financialHealthUsers') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedData };
      localStorage.setItem('financialHealthUsers', JSON.stringify(users));
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};