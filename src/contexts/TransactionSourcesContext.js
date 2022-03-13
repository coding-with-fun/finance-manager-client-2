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
    const [perPage, setPerPage] = useState(5);
    const [count, setCount] = useState(0);
    const [sortBy, setSortBy] = useState({
        sortField: "createdAt",
        sortType: "asc",
    });

    const params = {
        pageNumber,
        perPage,
        count,
        sortField: sortBy.sortField,
        sortType: sortBy.sortType,
    };

    const { refetch: refetchTransactionSources } = useQuery(
        ["fetch-transaction-sources", params],
        () => FetchTransactionSources_API(params),
        {
            onSuccess: (data) => {
                const { pageNumber, perPage, transactionSources, count } =
                    _.get(data, "data");
                handleSetTransactionSources(transactionSources);

                setPageNumber(pageNumber);
                setPerPage(perPage);
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

    const handleChangePerPage = (data, cb) => {
        setPerPage(data);
        setPageNumber(0);
        if (cb) cb();
    };

    const handleChangeSortBy = (data, cb) => {
        setSortBy(data);
        setPageNumber(0);
        if (cb) cb();
    };

    useEffect(() => {
        if (isUserAuthenticated) refetchTransactionSources();

        // eslint-disable-next-line
    }, [isUserAuthenticated, pageNumber, perPage, sortBy]);

    return (
        <TransactionSourcesContext.Provider
            value={{
                transactionSources,
                pageNumber,
                perPage,
                count,

                handleSetTransactionSources,
                handleUpdateTransactionSources,
                handleChangePageNumber,
                handleChangePerPage,
                handleChangeSortBy,
                refetchTransactionSources,
            }}
        >
            {children}
        </TransactionSourcesContext.Provider>
    );
};
