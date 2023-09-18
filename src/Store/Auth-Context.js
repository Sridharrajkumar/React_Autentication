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
    
    const [token, setToken] = useState(null);

    const userLoggedIn = !!token;
    console.log(userLoggedIn);

    const LogInHandler = (to) => {
        setToken(to); 
    }

    const LogOutHandler = () => {
        setToken(null);
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