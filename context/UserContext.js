import React, {createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUserId] = useState("");
    const useSetCurrentUserId = (currentUser) => {
        setCurrentUserId(currentUser);
    }

    return (

        <UserContext.Provider value={{ currentUser, useSetCurrentUserId }}>
            {children}
        </UserContext.Provider>
    )
}


