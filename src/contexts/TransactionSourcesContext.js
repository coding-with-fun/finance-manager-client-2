import _ from "lodash";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { FetchTransactionSources_API } from "../api/TransactionSource.api";
import { UserDataContext } from "./UserDataContext";

export const TransactionSourcesContext = createContext();

export const TransactionSourcesProvider = ({ children }) => {
    const { isUserAuthenticated } = useContext(UserDataContext);

    const [transactionSources, setTransactionSources] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [count, setCount] = useState(0);

    const params = {
        pageNumber,
        perPage: pageSize,
        count,
    };

    console.log(params);

    const { refetch: refetchTransactionSources } = useQuery(
        ["fetch-transaction-sources", params],
        () => FetchTransactionSources_API(params),
        {
            onSuccess: (data) => {
                const { pageNumber, perPage, transactionSources, count } =
                    _.get(data, "data");
                handleSetTransactionSources(transactionSources);

                setPageNumber(pageNumber);
                setPageSize(perPage);
                setCount(count);
            },
            enabled: false,
            // keepPreviousData: true,
        }
    );

    const handleSetTransactionSources = (data, cb) => {
        setTransactionSources(data);

        if (cb) cb();
    };

    const handleUpdateTransactionSources = (data, cb) => {
        setTransactionSources((prevSources) => {
            return [...data];
        });

        if (cb) cb();
    };

    const handleChangePageNumber = (data, cb) => {
        setPageNumber(data);
        if (cb) cb();
    };

    const handleChangePageSize = (data, cb) => {
        setPageSize(data);
        if (cb) cb();
    };

    useEffect(() => {
        if (isUserAuthenticated) refetchTransactionSources();

        // eslint-disable-next-line
    }, [isUserAuthenticated]);

    return (
        <TransactionSourcesContext.Provider
            value={{
                transactionSources,
                pageNumber,
                pageSize,
                count,

                handleSetTransactionSources,
                handleUpdateTransactionSources,
                handleChangePageNumber,
                handleChangePageSize,
                refetchTransactionSources,
            }}
        >
            {children}
        </TransactionSourcesContext.Provider>
    );
};
