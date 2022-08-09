import React, { useState } from 'react'
import { GiKnifeFork } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import { logout } from '../features/userSlice';


function Navbar() {
  const [input, setInput] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();


  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/searched/${input}`);

    console.log(e);
  };
  const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
  }
  return (
    <div>
      <Nav>
        <GiKnifeFork />
        <Logo to="/">Dr Cook</Logo>
      </Nav>
      <FormStyle onSubmit={submitHandler}>
        <FaSearch />
        <input
          type="text"
          placeholder="Enter the dish or ingredient to search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </FormStyle>
      <button style={{ backgroundColor: "red", outline: 0, border: 0, padding: "3px", color: "white" }} onClick={logoutOfApp}>Logout </button>
    </div>
  )
}

const Logo = styled.a`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Consolas", sans-serif;
  padding-left: 1rem;
`;

const Nav = styled.div`
  padding: 2rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    color: var(--gray-600);
    font-size: 2rem;
  }
`;



const FormStyle = styled.form`
  position: absolute;
  width: 30%;
  top:1.75rem;
  right:300px;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    position: relative;
    width: 300px;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1rem;
    color: white;
    padding: 1rem 3rem;
    border: none;
    border-radius: 0.5rem;
    outline: none;
    width: 100%;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(100%, -50%);
    color: white;
  }
`;


export default Navbar