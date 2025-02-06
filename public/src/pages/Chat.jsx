import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts';
import { allUserRoute, host } from '../utils/APIRoutes';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from 'socket.io-client';

function Chat() {
    const socket = useRef();
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      const fetchCurrentUser = async () => {
        if (!localStorage.getItem('chatApp-user')) {
            navigate('/login');
        } else {
            const user = await JSON.parse(localStorage.getItem("chatApp-user"));
            console.log("Current User:", user); // Debugging log
            setCurrentUser(user);
            setIsLoaded(true);
        }
      };
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser]);

    useEffect(() => {
        const fetchContacts = async () => {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    try {
                        const { data } = await axios.get(`${allUserRoute}/${currentUser._id}`);
                        setContacts(data);
                    } catch (error) {
                        console.error("Error fetching contacts", error);
                    }
                } else {
                    navigate('/setAvatar');
                }
            }
        };
        fetchContacts();
    }, [currentUser]);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };

    return (
        <Container>
            <div className='container'>
                <Contacts id="contact-list" contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
                {isLoaded && currentChat === "" ? (
                    <Welcome currentUser={currentUser} />
                ) : (
                    <ChatContainer 
                        currentChat={currentChat}  
                        currentUser={currentUser}
                        socket={socket}  
                    />
                )}
            </div>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    background-color: #131324;

    .container {
        border-radius: 10px;
        height: 95vh;
        width: 95vw; 
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 75%;

        @media screen and (min-width: 720px) and (max-width: 1080px) {
            grid-template-columns: 35% 65%;
        }
    }
`;

export default Chat;
