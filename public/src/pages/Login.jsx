import React, {useState,useEffect} from 'react'
import { Link, NavigationType, useNavigate  } from 'react-router-dom';
import styled from 'styled-components'
import Logo from '../assets/logo.png'
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { loginRoute } from '../utils/APIRoutes';

function Login() {
    const navigate = useNavigate();

    const [values,setValues]= useState({
        username:'',
        password:'',
    })

    const toastOptions = {
        position:"bottom-right",
        autoClose:3000,
        pauseOnHover:true,
        draggable:true,
        theme:'dark'
    }

    // useEffect(()=>{
    //     if(localStorage.getItem('chatApp-user')){
    //         navigate('/')
    //     }
    // },[]);

    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(handleValidation()){
            //call API
            console.log("valid",loginRoute)
            const {password,username} = values; 
            const {data} = await axios.post(loginRoute,{
                username,
                password,
            })
            if(data.status === false){
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true){
                localStorage.setItem('chatApp-user',JSON.stringify(data.user));
                navigate("/");
            }
        }
    }
    const handleChange = (event)=>{
        setValues({...values,[event.target.name]:event.target.value});
    }
    const handleValidation = ()=> {
        const {password,username} = values;
        if(username.length===""){
            toast.error("Username and password both are required",toastOptions);   
            return false;
        }
        else if(password===""){
            toast.error("Username and password both are required",toastOptions);   
            return false;
        }
        return true; 
    }

  return (
    <>
        <FormContainer>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="brand">
                    <img src={Logo} alt="logo" />  
                    <h1>Connecto</h1>
                </div>
                <input type="text" placeholder="Username" name="username" onChange={(e)=>handleChange(e)} min="3" />
                <input type="password" placeholder="Password" name="password" onChange={(e)=>handleChange(e)} />
                <button type='submit'>Login</button>
                <span>Dont have an account? <Link to="/register">Register</Link></span>
            </form>
        </FormContainer>
        <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap:1rem;
    align-items:center; 
    background-color: #131324;
    .brand {
        display:flex;
        justify-content:center;
        align-items:center;
        gap:1rem;
        img{
            height:50px;
            width:50px;
            gap:5rem;
        }
        h1{
            color:white;
            text-transform:uppercase;
        }
    }
    form{
        display:flex;
        flex-direction:column;
        gap:2rem;
        background-color:#020224;
        padding:3rem 5rem;
        border-radius:2rem ;

        input{
            background-color:transparent;
            padding:1rem;
            border:0.1rem solid #2b0e7a;
            border-radius:0.4rem;
            color:white;
            width:100%;
            font-size:1rem;
            &:focus{
                border:0.1rem solid #977fdb;
                outline:none;
            }
        }

        button{
            background-color:#977fdb ;
            padding:1rem 2rem;
            border:none;
            border-radius:0.4rem;
            color:white;
            width:100%;
            font-weight:bold;
            cursor:pointer;
            font-size:1rem;
            text-transform:uppercase;
            &:hover {
                background-color:#2b0e7a;
            }
        }
        span{
            color:white;
            text-transform:none;
            a{
                text-decoration:none; 
                font-weight:bold;
            }
        }
    }
`;

export default Login