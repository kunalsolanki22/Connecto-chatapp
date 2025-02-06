import React, { useState } from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'
import { useSearchParams } from 'react-router-dom'

function ChatInput({handleSendMessage}) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [msg, setMsg] = useState("")

    const handleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker)
    }

    const handleEmojiClick = (emoji) => {
        console.log(emoji)
        setMsg(prevMsg => prevMsg + emoji.emoji);
    }

    const sendChat = (e) => {
        e.preventDefault()
        if(msg.length>0){
            handleSendMessage(msg)
            setMsg('')
        }
    }
    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPicker} />
                    {
                        showEmojiPicker && <Picker className="emoji-picker" onEmojiClick={handleEmojiClick} />
                    }
                </div>
            </div>
            <form className='input-container' onSubmit={(e)=>sendChat(e )}>
                <input type="text" placeholder="Type a message..." value={msg} onChange={(e) => setMsg(e.target.value)} />
                <button className='submit'>
                    <IoMdSend />
                </button>
            </form>
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    background-color: #484874;
    padding: 0.3rem;
    
    .button-container {
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        margin: 0.5rem;
        gap: 1rem;
        position: relative;

        .emoji {
            position: relative;

            svg {
                font-size: 1.5rem;
                color: yellow;
                cursor: pointer;
            }

            .emoji-picker {
                position: absolute;
                bottom: 170%; /* Position above the button */
                left: 720%;
                transform: translateX(-50%);
                z-index: 10;
                background-color: #2c2444;
                border-radius: 0.5rem;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
                .emoji-categories{
                    button{
                        filter:contrast(0)
                    }
                }
                .emoji-search{
                    background-color:transparent;
                    border-color:#9186f3;
                }
                .emoji-group:before{
                    background-color:#080420;
                }
            }
        }
    }
    
    .input-container {
        border: 2px solid;
        width: 100%;
        display: flex;
        border-radius: 2rem;
        align-content: center;
        gap: 2rem;
        background-color: #2c2444;

        input {
            width: 90%;
            /* height: 60%; */
            background-color: transparent;
            color: white;
            border: none;
            padding-left: 1rem;
            font-size: 1rem;
            
            &::selection {
                background-color: #382ca3;
            }
            &:focus {
                outline: none;
            }
        }

        .submit {
            width: 2rem;
            padding: 0.3rem 2rem;
            border-radius: 2rem;
            background-color: #7559f0;
            border: none;

            svg {
                font-size: 1.5rem;
                color: white;
                transform: translateX(-35%);
            }
        }
    }
`

export default ChatInput
