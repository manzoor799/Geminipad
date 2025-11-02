import React, { useContext, useState, useEffect, createContext, ReactNode } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (name: string, email: string, password: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only set up the listener if Firebase was successfully initialized
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
      return unsubscribe;
    } else {
      // If Firebase is not configured, stop loading and treat as logged out.
      // This prevents the app from showing a blank page.
      setLoading(false);
      setUser(null);
    }
  }, []);

  const signInWithGoogle = async () => {
    if (!auth) {
      const errorMsg = "Firebase is not configured. Cannot sign in.";
      console.error(errorMsg);
      alert(errorMsg + " Please check the console for more details.");
      throw new Error(errorMsg);
    }
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signUpWithEmail = async (name: string, email: string, password: string) => {
    if (!auth) {
      const errorMsg = "Firebase is not configured. Cannot sign up.";
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // After creating the user, update their profile with the provided name.
    // The onAuthStateChanged listener will automatically pick up this change
    // and update the user state throughout the application.
    await updateProfile(userCredential.user, { displayName: name });
  };

  const signInWithEmail = async (email: string, password: string) => {
    if (!auth) {
      const errorMsg = "Firebase is not configured. Cannot sign in.";
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    if (!auth) {
      console.error("Firebase is not configured. Cannot sign out.");
      return;
    }
    await signOut(auth);
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}