import React, { createContext, useState } from "react";

export const TransactionSourcesContext = createContext();

export const TransactionSourcesProvider = ({ children }) => {
    const [transactionSources, setTransactionSources] = useState([]);
    const [
        transactionSourcesPaginationDetails,
        setTransactionSourcesPaginationDetails,
    ] = useState({
        pageNumber: 1,
        perPage: 10,
        sortField: "createdAt",
        sortType: "asc",
    });

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
        setTransactionSourcesPaginationDetails(data);

        if (cb) cb();
    };

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
