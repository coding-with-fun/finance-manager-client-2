import React, { createContext, useState } from "react";

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        username: "",
    });

    const handleSetUserData = (data, cb) => {
        setUserData(data);

        if (cb) cb();
    };

    return (
        <UserDataContext.Provider
            value={{
                userData,

                handleSetUserData,
            }}
        >
            {children}
        </UserDataContext.Provider>
    );
};
