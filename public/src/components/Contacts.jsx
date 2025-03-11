import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo.png';
import { FaSearch } from "react-icons/fa";
import defaultAvatar from '../assets/default.png';


function Contacts({ contacts, currentUser, changeChat }) {
    const [currentUsername, setCurrentUsername] = useState("");
    const [currentImage, setCurrentImage] = useState("");
    const [currentSelected, setCurrentSelected] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setCurrentImage(currentUser.avatarImage);
            setCurrentUsername(currentUser.username);
        }
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };

    return (
        <>
            {currentImage && currentUsername && (
                <Container>
                    {/* Brand & Search */}
                    <div className={`brand ${isSearchExpanded ? "search-expanded" : ""}`}>
                        <img src={Logo} alt="logo" className="logo" />
                        <h3 className="name">Connecto</h3>
                        <div className={`search-container ${isSearchExpanded ? "expanded" : ""}`}>
                            <input
                                type="text"
                                placeholder="Search contacts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                            <span
                                className="search-icon"
                                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                            >
                                <FaSearch />
                            </span>
                        </div>
                    </div>

                    {/* Contact List */}
                    <div className="contacts">
                        {contacts
                            .filter((contact) =>
                                contact.username.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((contact, index) => (
                                <div
                                    className={`contact ${index === currentSelected ? "selected" : ""}`}
                                    key={index}
                                    onClick={() => changeCurrentChat(index, contact)}
                                >
                                    <div className="avatar">
                                        {contact.avatarImage ? (
                                            <img src={contact.avatarImage} alt="avatar" /> // Ensure this is the correct image URL
                                        ) : (
                                            <img src={defaultAvatar} alt="default avatar" />  // Optional: use a default avatar
                                        )}
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                        ))}
                    </div>

                    {/* Current User */}
                    <div className="currentUser">
                        <div className="avatar">
                            <img src={`${currentImage}`} alt="User Avatar" />
                        </div>
                        <div className="username">
                            <h2>{currentUsername}</h2>
                        </div>
                    </div>
                </Container>
            )}
        </>
    );
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    border-radius: 10px 0 0 10px;
    overflow: hidden;
    background-color: #080420;

    /* Brand (Header) */
    .brand {
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem;
        position: relative;
        transition: all 0.3s ease;
        width: 100%;  

        img {
            height: 2rem;
            transition: all 0.3s ease;
        }

        h3 {
            color: #fff;
            text-transform: uppercase;
            transition: opacity 0.3s ease, margin-left 0.3s ease;
            margin-left: 1rem;
        }

        &.search-expanded h3 {
            opacity: 0;
            margin-left: 0;
        }

        .search-container {
            position: absolute;
            right: 0.5rem;
            display: flex;
            align-items: center;
            width: 2rem;
            transition: all 0.3s ease;

            &.expanded {
                width: 180px;

                .search-input {
                    opacity: 1;
                    pointer-events: all;
                }
            }

            .search-input {
                padding: 0.5rem 1rem;
                border-radius: 2rem;
                border: none;
                outline: none;
                background-color: #fff;
                color: #000;
                width: 100%;
                opacity: 0;
                pointer-events: none;
                transition: all 0.3s ease;
            }

            .search-icon {
                position: absolute;
                right: 0.5rem;
                color: #1036a8;
                cursor: pointer;
                z-index: 1;
            }
        }
    }

    /* Contact List */
    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: auto;
        gap: 0.8rem;
        padding-top: 1rem;

        &::-webkit-scrollbar {
            width: 0.4rem;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #4b4b4b;
            border-radius: 1rem;
        }

        .contact {
            background-color: #0d0d30;
            min-height: 3rem;
            width: 95%;
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.5rem;
            font-size: 0.9rem;
            cursor: pointer;
            border-radius: 0.5rem;
            transition: 0.5s ease-in-out;

            .avatar img {
                height: 2.4rem;
                border-radius: 50%;
            }

            .username h3 {
                color: #fff;
            }

            &.selected {
                background-color: #6654b7;
            }
        }
    }

    /* Current User */
    .currentUser {
        background-color: #0d0d30;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        padding-top: 1rem;
        
        .avatar img {
            height: 3.5rem;
            border-radius: 50%;
        }

        .username h2 {
            color: #fff;
        }
    }

    /* Mobile & Small Screens */
    @media screen and (max-width: 720px) {
        .brand {
            padding: 0 0.5rem;
            justify-content: center;
        }

        .brand .name {
            display: none;
        }

        .brand img {
            height: 2.5rem;
        }

        .brand .search-container {
            display: none;
        }

        .contacts {
            width: 100%;
            padding-top: 0.5rem;
        }

        .contact {
            width: 100%;
            padding: 0.3rem;
            font-size: 0.8rem;
            justify-content: center;
        }

        .contact .avatar img {
            height: 2rem;
        }

        .contact .username {
            display: none;
        }

        .currentUser {
            width: 100%;
            padding-top: 0.5rem;
        }

        .currentUser .username {
            display: none;
        }
    }
`;

export default Contacts;
