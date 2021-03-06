import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { auth } from '../firebase'

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged((user1) => {
            setUser(user1);
            setLoading(false);
            console.log("authContext : ");
            console.log(user);
            if(user) history.push('/chats');
        })
    }, [user, history]);

    const value  = {user};     ///notice {user} is assigned to value not user.

    return (
        <AuthContext.Provider value={value} >
            {(!loading && children)}
        </AuthContext.Provider>
    )
}
