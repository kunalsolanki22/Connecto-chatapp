import React from 'react';
import styled from 'styled-components';
import Loader from "../assets/Loader";

function Welcome({ currentUser }) {
  return (
    <Container>
      <Loader/>
      {currentUser ? (  
        <>
          <h1>
            Welcome, <span>{currentUser.username}</span>
          </h1>
          <h4>Please select a chat to continue</h4>
        </>
      ) : (
        <h4>Loading...</h4>  
      )}
    </Container>
  );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    img {
        height: 20rem;
    }
    span {
        color: #143872;
    }
`;

export default Welcome;
