import React from 'react'
import { useHistory } from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'
import { auth } from '../firebase'

import { useAuth } from '../contexts/AuthContext'

const Chats = () => {

    const history = useHistory();
    const user = useAuth();
    console.log(user);

    const handleLogout = async () => {
        await auth.signOut();
        history.push('/');
    }
    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Unichat
                </div>
                <div className="logout-tab" onClick={() => handleLogout()}>
                    Logout
                </div>
            </div>
            <ChatEngine
                height="calc(100vh-66px)"
                projectId="46b8c259-e9c7-4f71-bf72-5bae5a0ec44e"
                userName=""
                userSecret=""
            />
        </div>
    )
}

export default Chats
