import React, {useState,useEffect} from 'react'
import { Link, NavigationType, useNavigate  } from 'react-router-dom';
import styled from 'styled-components'
import Logo from '../assets/logo.png'
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { registerRoute } from '../utils/APIRoutes';

function Register() {
    const navigate = useNavigate();

    const [values,setValues]= useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:'',
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
    //         navigate('/login')
    //     }
    // },[]);

    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(handleValidation()){
            //call API
            console.log("valid",registerRoute)
            const {password,username,email} = values; 
            const {data} = await axios.post(registerRoute,{
                username,
                email,
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
        const {password,confirmPassword,username,email} = values;
        if(password!==confirmPassword){
            toast.error("Password and Confirm Password should be same",toastOptions);   
            return false;
        }
        else if(username.length<3){
            toast.error("Username should be greater than 3 characters",toastOptions);   
            return false;
        }
        else if(password.length<8){
            toast.error("Password length should be greater than or equal to 8",toastOptions);   
            return false;
        }
        else if(email===""){
            toast.error("Email is required",toastOptions);   
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
                <input type="text" placeholder="Username" name="username" onChange={(e)=>handleChange(e)} />
                <input type="email" placeholder="Email" name="email" onChange={(e)=>handleChange(e)} />
                <input type="password" placeholder="Password" name="password" onChange={(e)=>handleChange(e)} />
                <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={(e)=>handleChange(e)} />
                <button type='submit'>Create User</button>
                <span>Already have an account? <Link to="/login">Login</Link></span>
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

export default Register