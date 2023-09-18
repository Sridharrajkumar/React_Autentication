import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import Authcontext from '../../Store/Auth-Context';

const MainNavigation = () => {


  const Authcxt = useContext(Authcontext);

  const logOutHandler = () => {
    Authcxt.logOut();
  }

  const logCheck = Authcxt.IsLogged;
  console.log(logCheck);

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!logCheck && (
            <li>
               <Link to='/auth'>Login</Link>
             </li>
          )}
          {logCheck && (
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          )}

          {logCheck && (
            <li>
               <button onClick={logOutHandler}>Logout</button>
            </li>
          )}
          
          
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
