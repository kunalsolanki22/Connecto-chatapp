import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import { getAllMessageRoute, sendMessageRoute } from "../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";

function ChatContainer({ currentChat, currentUser, socket }) {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();

    useEffect(() => {
        const fetchMessages = async () => {
            if (currentChat) {
                try {
                    const { data } = await axios.post(getAllMessageRoute, {
                        from: currentUser._id,
                        to: currentChat._id,
                    });
                    setMessages(data);
                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            }
        };
        fetchMessages();
    }, [currentChat, currentUser]);

    const handleSendMessage = async (msg) => {
        try {
            await axios.post(sendMessageRoute, {
                from: currentUser._id,
                to: currentChat._id,
                message: msg,
            });
            setMessages((prev) => [...prev, { fromSelf: true, message: msg }]);
            socket.current.emit("send-msg", {
                from: currentUser._id,
                to: currentChat._id,
                message: msg,
            });
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-receive", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    }, []);

    useEffect(() => {
        if (arrivalMessage) {
            setMessages((prev) => [...prev, arrivalMessage]);
        }
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img src={currentChat.avatarImage} alt="User Avatar" />
                    </div>
                    <div className="username">
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
                <div className="logout">
                    <Logout />
                </div>
            </div>
            <div className="chat-messages">
                {messages.map((message) => (
                    <div ref={scrollRef} key={uuidv4()} className={`message ${message.fromSelf ? "sended" : "received"}`}>
                        <div className="content">
                            <p>{message.message}</p>
                        </div>
                    </div>
                ))}
            </div>
            <ChatInput handleSendMessage={handleSendMessage} />
        </Container>
    );
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 78% 12%;
    gap: 0.1rem;
    overflow: hidden;

    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.3rem 1rem;
        background-color: #1c1255;
        border-top-right-radius: 10px;

        .user-details {
            display: flex;
            align-items: center;
            
            .avatar {
                height: 3.2em;
                width: 3.2rem;
                border: 4px solid #120f21;
                border-radius: 50%;
                overflow: hidden;
            }

            .avatar img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }

            .username {
                margin-left: 1rem;
                color: white;
            }
        }

        .logout {
            margin-left: auto;
        }
    }

    .chat-messages {
        overflow: auto;
        display: flex;
        flex-direction: column;
        padding: 1rem 2rem;
        gap: 1rem;

        .message {
            display: flex;
            align-items: center;
            transition: all 0.3s ease-in-out;

            .content {
                max-width: 40%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color: #d1d1d1;
            }
        }

        .sended {
            justify-content: flex-end;
            .content {
                background-color: #4f04ff21;
            }
        }

        .received {
            justify-content: flex-start;
            .content {
                background-color: #9900ff20;
            }
        }
    }
`;

export default ChatContainer;
