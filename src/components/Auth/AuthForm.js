import { useState,useRef, useContext } from 'react';

import classes from './AuthForm.module.css';
import Authcontext from '../../Store/Auth-Context';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, seterror] = useState();
  const emailRef = useRef();
  const passRef = useRef();

  const authCxt = useContext(Authcontext);
  

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    
  };

  const submitHandler = async(event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const pass = passRef.current.value;
    seterror('');

    if (isLogin)
    {
      const api = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDhWSFFHCybRyL4cgPavj7q4BlAKgAACZM',
        {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            password: pass,
            returnSecureToken:true
          }),
          headers:{'Content-Type':'application/json'},
        }
      )
      const data = await api.json();
      if (api.ok)
      {
        console.log('loggedin')
        authCxt.logIn(data.idToken);
      }
      else
      {
        seterror(data.error.message);
      }
    }
    else
    {
        const api = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDhWSFFHCybRyL4cgPavj7q4BlAKgAACZM',
        {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            password: pass,
            returnSecureToken:true
          }),
          headers: {
            'Content-Type':"application/json",
          }
        }
      );
      if (!api.ok)
      {
        const err = await api.json();
        seterror(err.error.message);
      }
      
    }
    
    emailRef.current.value = null;
    passRef.current.value = null;
    
     
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password' ref={passRef}>Your Password</label>
          <input type='password' id='password' required ref={passRef}/>
        </div>
        <h6 style={{color:'white'}}>{error}</h6>
        
        <div className={classes.actions}>
          <button >{isLogin ? 'Login':'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
