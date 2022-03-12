import React, { createContext, useState } from "react";

export const TransactionSourcesContext = createContext();

export const TransactionSourcesProvider = ({ children }) => {
    const [transactionSources, setTransactionSources] = useState([]);

    const handleSetTransactionSources = (data, cb) => {
        setTransactionSources((prevSources) => {
            return [...prevSources, data];
        });

        if (cb) cb();
    };

    return (
        <TransactionSourcesContext.Provider
            value={{
                transactionSources,

                handleSetTransactionSources,
            }}
        >
            {children}
        </TransactionSourcesContext.Provider>
    );
};
