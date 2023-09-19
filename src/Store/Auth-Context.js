import React, { useState } from 'react'

const Authcontext = React.createContext(
    {
        token: '',
        IsLogged: false,
        logIn: (token) => {},
        logOut: () =>{}
    }
)

export const AuthContextProvider = (props) => {

    const localtoken = localStorage.getItem('token') || null;
    
    const [token, setToken] = useState(localtoken);

    const userLoggedIn = !!token;
    console.log(userLoggedIn);

    const LogInHandler = (to) => {
        setToken(to); 
        localStorage.setItem('token',to);
    }

    const LogOutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    }

    const contextValue = {
        token: token,
        IsLogged: userLoggedIn,
        logIn: LogInHandler,
        logOut :LogOutHandler
    }

    return (
        <Authcontext.Provider value={contextValue}>
            {props.children}
        </Authcontext.Provider>
    )
}
 

export default Authcontext