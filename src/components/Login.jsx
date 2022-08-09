import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import { auth } from '../firebase';
import styled from "styled-components";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [btn, setBtn] = useState(true);

    const dispatch = useDispatch();

    const loginToApp = e => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then(userAuth => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: userAuth.user.displayName,
                }))
            })
            .catch(error => alert(error));
    };

    const register = () => {
        if (!name) {
            return alert("Please enter a full name");
        };

        auth.createUserWithEmailAndPassword(email, password)
            .then(userAuth => {
                userAuth.user.updateProfile({
                    displayName: name,
                })
                    .then(() => {
                        dispatch(login({
                            email: userAuth.user.email,
                            uid: userAuth.user.uid,
                            displayName: name,
                        }))
                    })
            }).catch(error => alert(error));
    };
    const handleClick = (e) => {
        e.preventDefault();
        btn ? loginToApp(e) : register(e)
    }

    const signup = () => {
        setBtn(false);
    }
    const signin = () => {
        setBtn(true);
    }

    return (
        <div>
            <h3>
                DR.Cook
            </h3>
            <Nav>
                <img
                    src="https://2rdnmg1qbg403gumla1v9i2h-wpengine.netdna-ssl.com/wp-content/uploads/sites/3/2021/01/fastFoods1-1199461884-770x533-1-650x428.jpg"
                    alt="Food"
                />


                <form style={{
                    "display": "flex",
                    "flexDirection": "column"
                }}>
                    <input
                        type="text"
                        value={name}
                        style={{ "display": btn ? "none" : "" }}
                        onChange={e => setName(e.target.value)}
                        placeholder="Full name"
                    />

                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button type="submit" onClick={handleClick}
                    >{btn ? "SignIn" : "SignUp"}</button>
                </form>
                {
                    btn === true ? (
                        <p>
                            Not a member? {" "}
                            <span style={{ "color": "#0177b7", "cursor": "pointer" }} onClick={signup}>Register Now</span>
                        </p>) : (
                        <p>
                            Already have a  Account? {" "}
                            <span style={{ "color": "#0177b7", "cursor": "pointer" }} onClick={signin}>SignIn</span>
                        </p>

                    )
                }
            </Nav >

        </div>
    );
}




const Nav = styled.div`
  padding: 6rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  
  img {
    object-fit: contain;
    height: 100px;
    border-radius:5px;
    
  }

  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1rem;
    color: white;
    margin-top:1rem;
    margin-bottom:0.5rem;
    margin-left:2rem;
    padding: 1rem 3rem;
    border: none;
    border-radius: 0.5rem;
    outline: none;
    width: 100%;
  }

  button {
    width: 356px;
    height: 50px;
    font-size: medium;
    width:50%;
    color: #ffff;
    background-color: #0074b1;
    border-radius: 5px;
    border: none;
    margin-left:2rem;
    margin-top: 1rem;
  }
  p{
    position: relative;
    top: 10.5rem;
    right: 19rem;
    color:black;
  }

`;

export default Login