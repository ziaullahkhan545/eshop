import React, { useState } from "react";
import CustomBtn from "../custom-button/custom-button";
import { LoginWithGoogle } from "../firebase/firebase-utils";
import "./login.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { connectFirestoreEmulator } from "firebase/firestore";

function Login() {

  const [state, setState] = useState({
    email: '',
    password: ''
  })

  const { email, password } = state;

  const handleChange = (event) => {
    event.preventDefault();
    const {name, value} = event.target;
    setState({
      ...state, 
      [name]: value,
    })
  }

  const loginWithEmail = async (event) => {
    try {
      const auth = getAuth();
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      console.log('credentials : ',credentials);
      setState({
        email: '',
        password: ''
      })
    } catch(error) {
      console.log('something went wrong', error);
    }

  }
  

  return (
    <div className="login-card">
      <span className="login-title">I already have an account</span>
      <span className="login-subtitle">Login with your email and password</span>
      <form method="POST"> 
        <div className="input-field">
          <input 
            type="email" 
            required 
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="enter your email" 
          />
        </div>
        <div className="input-field">
          <input 
            type="password" 
            required
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="enter your password" 
          />
        </div>
        <div className="buttons">
          <CustomBtn className={'login'} type={'submit'} onClick={loginWithEmail}>Login</CustomBtn>
          <CustomBtn className={'login-google'} type="button" onClick={LoginWithGoogle}>Login with google</CustomBtn>
        </div>
      </form>
    </div>
  );
}

export default Login;



