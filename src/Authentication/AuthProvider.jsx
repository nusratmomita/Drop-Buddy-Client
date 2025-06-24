import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../firebase/firebase.config'
import { createUserWithEmailAndPassword , GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const AuthProvider = ({children}) => {

    const [user , setUser] = useState(null);
    const [loading , setLoading] = useState(true);

    const provider = new GoogleAuthProvider();

    // creating new user
    const handleRegister = (email,password) => {
        setLoading(false);
        return createUserWithEmailAndPassword(auth, email,password)
    }

    // handling login
    const handleLogin = (email,password) => {
       setLoading(false);
       return signInWithEmailAndPassword(auth,email,password);
    }    

    // handle Google Auth
    const handleGoogleAuth = () => {
        setLoading(false);
        return signInWithPopup(auth,provider)
    }

    // handle logout
    const handleLogout = () => {
        return signOut(auth);
    }

    const userInfo = {
        handleRegister,
        handleGoogleAuth,
        handleLogin,
        handleLogout,
        user,
        loading
    }

    return (
        <AuthContext.Provider value={userInfo}>
            {
                children
            }
        </AuthContext.Provider>
    );
};

export default AuthProvider;