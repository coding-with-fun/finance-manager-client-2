import _ from "lodash";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { FetchTransactionSources_API } from "../api/TransactionSource.api";
import { UserDataContext } from "./UserDataContext";

export const TransactionSourcesContext = createContext();

export const TransactionSourcesProvider = ({ children }) => {
    const { isUserAuthenticated } = useContext(UserDataContext);

    const [transactionSources, setTransactionSources] = useState([]);
    const [
        transactionSourcesPaginationDetails,
        setTransactionSourcesPaginationDetails,
    ] = useState({
        pageNumber: 1,
        perPage: 1,
        sortField: "createdAt",
        sortType: "asc",
    });

    const params = {
        pageNumber: transactionSourcesPaginationDetails.pageNumber,
        perPage: transactionSourcesPaginationDetails.perPage,
        sortField: transactionSourcesPaginationDetails.sortField,
        sortType: transactionSourcesPaginationDetails.sortType,
    };

    const { refetch } = useQuery(
        "fetch-transaction-sources",
        () => FetchTransactionSources_API(params),
        {
            onSuccess: (data) => {
                const {
                    pageNumber,
                    perPage,
                    sortField,
                    sortType,
                    transactionSources,
                } = _.get(data, "data");
                handleSetTransactionSources(transactionSources);
                handleSetTransactionSourcesPaginationDetails({
                    pageNumber,
                    perPage,
                    sortField,
                    sortType,
                });
            },
            enabled: false,
        }
    );

    const handleSetTransactionSources = (data, cb) => {
        setTransactionSources(data);

        if (cb) cb();
    };

    const handleUpdateTransactionSources = (data, cb) => {
        setTransactionSources((prevSources) => {
            return [...prevSources, data];
        });

        if (cb) cb();
    };

    const handleSetTransactionSourcesPaginationDetails = (data, cb) => {
        setTransactionSourcesPaginationDetails((prevDetails) => {
            return {
                ...prevDetails,
                data,
            };
        });

        if (cb) cb();
    };

    useEffect(() => {
        if (isUserAuthenticated) refetch();

        // eslint-disable-next-line
    }, [isUserAuthenticated]);

    return (
        <TransactionSourcesContext.Provider
            value={{
                transactionSources,
                transactionSourcesPaginationDetails,

                handleSetTransactionSources,
                handleUpdateTransactionSources,
                handleSetTransactionSourcesPaginationDetails,
            }}
        >
            {children}
        </TransactionSourcesContext.Provider>
    );
};
