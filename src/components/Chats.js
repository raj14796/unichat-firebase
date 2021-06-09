import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'
import { auth } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'

const Chats = () => {

    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const { user } = useAuth();
    console.log(user);

    useEffect(() => {
        if (!user) {
            history.push('/');
            return;
        }

        const userGetHeader = {
            headers: {
                "project-id": process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID,   //do not put username in camelcase as it is predefined in chat engine
                "user-name": user.email,
                "user-secret": user.uid,
            },
        }
        axios.get('https://api.chatengine.io/users/me', userGetHeader)
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                let formdata = new FormData();
                formdata.append('email', user.email);
                formdata.append('username', user.email);    //do not put username in camelcase as it is predefined in chat engine
                formdata.append('secret', user.uid);

                getFile(user.photoURL)
                    .then((avatar) => {
                        formdata.append('avatar', avatar, avatar.name);
                        const userPostHeader = {
                            headers: {
                                "private-key": process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY, //do not put username in camelcase as it is predefined in chat engine
                            },
                        }
                        console.log(formdata);
                        axios.post('https://api.chatengine.io/users', formdata, userPostHeader)
                            .then(() => setLoading(false))
                            .catch((error) => console.log(error))
                    })
            })
    }, [user, history])

    const handleLogout = async () => {
        await auth.signOut();
        history.push('/');
    }
    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' });
    }


    if (!user || loading) return ('Loading...')

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
                projectID={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    )
}

export default Chats
