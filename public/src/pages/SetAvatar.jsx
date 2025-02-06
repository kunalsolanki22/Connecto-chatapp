import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { setAvatarRoute } from '../utils/APIRoutes';
import loader from '../assets/loader.gif';

function SetAvatar() {
    const api = "https://api.dicebear.com/7.x/avataaars/svg?seed=";
    const navigate = useNavigate();

    const [avatars, setAvatars] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastOptions = {
        position: "bottom-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    };

    useEffect(() => {
        if (!localStorage.getItem('chatApp-user')) {
            navigate('/login');
        }
    }, []);

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions);
        } else {
            const user = await JSON.parse(localStorage.getItem("chatApp-user"));
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
            });
    
            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chatApp-user", JSON.stringify(user));
                navigate('/');
            } else {
                toast.error("Failed to set avatar, Please try again later", toastOptions);
            }
        }
    };
    
    const handleAvatarClick = (index) => {
        setSelectedAvatar(index); // Update state to reflect the selected avatar
    };
    

    useEffect(() => {
        const fetchAvatars = async () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const randomSeed = Math.random().toString(36).substring(7);
                data.push(`${api}${randomSeed}`);
            }
            setAvatars(data);
            setIsLoading(false);
        };

        fetchAvatars();
    }, []);

    return (
        <>
            {loading ? (
                <Container>
                    <img src={loader} alt="loader" className='loader' />
                    <h1 className='loadText'>Loading...</h1>
                </Container>
            ) : (
                <Container>
                    <div className="title-container">
                        <h1>Pick your profile picture</h1>
                    </div>
                    <div className="avatars">
                        {avatars.map((avatar, index) => (
                            <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                                <img src={avatar} alt="Avatar" onClick={() => handleAvatarClick(index)} />
                            </div>
                        ))}
                    </div>

                    <button className='submit' onClick={setProfilePicture}>Set Profile Picture</button>
                </Container>
            )}
            <ToastContainer />
        </>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #131314;
    gap: 3rem;
    height: 100vh;
    width: 100vw;

    .loader {
        max-inline-size: 100%;
        height: 15rem;
        width: 15rem;
    }
    .loadText {
        color: #fff;
    }
    .title-container {
        h1 {
            color: white;
        }
    }
    .avatars {
        display: flex;
        gap: 2rem;
        .avatar {
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.4s ease-in-out;
            img {
                height: 6rem;
                border-radius: 50%;
            }
        }
        .selected {
            border: 0.4rem solid #023986;
        }
    }
    .submit {
        background-color: #977fdb;
        padding: 1rem 2rem;
        border: none;
        border-radius: 0.4rem;
        color: black;
        font-weight: bold;
        cursor: pointer;
        font-size: 1rem;
        text-transform: uppercase;
        &:hover {
            background-color: #2b0e7a;
            color: white;
        }
    }
`;

export default SetAvatar;