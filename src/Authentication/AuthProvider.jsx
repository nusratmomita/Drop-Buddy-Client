import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../Firebase/firebase.config.js'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

const AuthProvider = ({children}) => {

    const provider = new GoogleAuthProvider();

    const [user , setUser] = useState(null);
    const [loading , setLoading] = useState(true);

    // console.log(loading,user);


    // register with email & password
    const handleRegister = (email,password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }

    // register with google
    const handleGoogleAuth = () => {
        setLoading(true);
        return signInWithPopup(auth,provider);
    }

    // login with email & password
    const handleLogin = (email,password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    // update profile
    const handleUpdateProfile = (updateData) => {
        return updateProfile(auth.currentUser , updateData)
    } 

    // handle logout
    const handleLogout = () => {
        setLoading(false);
        return signOut(auth);
    }
    
    // setting up an observer
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        
        return () => {
            unsubscribe();
        }
    })
    
    const userInfo = {
        handleRegister,
        handleGoogleAuth,
        handleUpdateProfile,
        handleLogin,
        handleLogout,
        user,
        setUser,
        loading,setLoading,
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