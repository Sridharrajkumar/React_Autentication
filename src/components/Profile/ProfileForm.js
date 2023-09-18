import { useContext, useRef} from 'react';
import classes from './ProfileForm.module.css';
import Authcontext from '../../Store/Auth-Context';
import {useHistory} from 'react-router-dom'

const ProfileForm = () => {

  const newPassRef = useRef();
  const authCxt = useContext(Authcontext);
  const history = useHistory();

  const SubmitHandler = async(e) => {
    e.preventDefault();
    const newpass = newPassRef.current.value;

    const api=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDhWSFFHCybRyL4cgPavj7q4BlAKgAACZM',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCxt.token,
          password: newpass,
          returnSecureToken: true
        }),
        headers: {'Content-Type':'application/json'}
      })
    if (api.ok)
    {
      alert('password changed successfully');
      history.replace('/');
    }
       
    newPassRef.current.value = null;
  }
  return (
    <form className={classes.form} onSubmit={SubmitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPassRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
