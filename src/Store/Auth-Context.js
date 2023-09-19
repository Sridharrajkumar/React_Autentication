import React, { useEffect, useState } from 'react'

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
        localStorage.setItem('token', to);
        localStorage.setItem('loggedInTime', Date.now());
        console.log(Date.now());
    }

    const LogOutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInTime');
    }

    const checkLogIn = () => {
        const logtime = localStorage.getItem('loggedInTime');
        const storedToken = localStorage.getItem('token');

        if (logtime && storedToken)
        {
            const expiretime =  Number(logtime) + 1 * 60 * 1000;
            console.log('expiretime:', expiretime);
            console.log('Date.now():', Date.now());
            if (Date.now() >= expiretime)
            {
                setToken(null);
                localStorage.removeItem('token');
                localStorage.removeItem('loggedInTime');   
            }
        }
    }

    useEffect(() => {
        checkLogIn()
        console.log('lets check this out');
    }, []);

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

