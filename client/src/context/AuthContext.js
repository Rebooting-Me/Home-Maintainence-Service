import { React, createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case "SIGNIN":
            return { user: action.payload };
        case "SIGNOUT":
            return { user: null };
        default:
            return state;
    }
}

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children, testingState }) => {
    // Use a provided user for testing if specified.
    let testUser = null;
    if (testingState) {
        testUser = testingState.user;
    }

    const [state, dispatch] = useReducer(authReducer, {
        user: null || testUser
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({ type: 'SIGNIN', payload: user });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}