import React, { useEffect } from "react";
import Category from "./components/Category";
import Pages from "./pages/Pages";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { useSelector, useDispatch } from 'react-redux'
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
        }))
      } else {
        dispatch(logout());
      }
    })
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Navbar />
            <Category />
            <Pages />
          </>
        )}
      </Router>
    </div>
  );
}


export default App;
