import _ from "lodash";
import React, { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { FetchUserDetails_API } from "../api/User.api";
import { GetUserToken } from "../utils/HandleUserToken";

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
    const userToken = GetUserToken();

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
    });

    const { refetch } = useQuery("fetch-user-data", FetchUserDetails_API, {
        onSuccess: (data) => {
            const body = _.get(data, "data.user");
            handleSetUserData(body);
        },
        enabled: false,
    });

    useEffect(() => {
        if (Boolean(userToken)) refetch();

        // eslint-disable-next-line
    }, [userToken]);

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
