import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '~/firebase'

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [curUser, setCurUser] = useState();

    const signUp = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const logout = () => {
        return auth.signOut();
    }

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurUser(user);
        })
        return unsubscribe;
        // return () => {
        //     unsubscribe();
        // }
    }, [])

    const value = { curUser, signUp, login, logout, resetPassword };


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
