import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext } from "react";
import { TransactionSourcesContext } from "../../../contexts/TransactionSourcesContext";

const TransactionSourcesList = () => {
    const {
        transactionSources,
        perPage,
        count,
        handleChangePageNumber,
        handleChangePerPage,
        handleChangeSortBy,
    } = useContext(TransactionSourcesContext);

    const columns = [
        { field: "name", headerName: "Name", flex: 1 },
        { field: "type", headerName: "Account Type", flex: 0.9 },
        {
            field: "balance",
            headerName: "Balance",
            width: 150,
            valueFormatter: (params) => {
                const valueFormatted = Number(params.value).toLocaleString(
                    "en-IN",
                    {
                        maximumFractionDigits: 2,
                    }
                );
                return `${valueFormatted} INR`;
            },
        },
    ];

    return (
        <Box
            sx={{
                height: "42.6rem",
                mt: "2rem",
            }}
        >
            <DataGrid
                autoHeight
                pagination
                disableColumnFilter
                pageSize={perPage}
                rowCount={count}
                paginationMode="server"
                rowsPerPageOptions={[1, 2, 5, 10, 20]}
                rows={transactionSources}
                columns={columns}
                getRowId={(row) => row._id}
                onPageChange={(page) => {
                    handleChangePageNumber(page);
                }}
                onPageSizeChange={(newPageSize) =>
                    handleChangePerPage(newPageSize)
                }
                onSortModelChange={(newOrder) => {
                    handleChangeSortBy({
                        sortField: newOrder[0]?.field || "createdAt",
                        sortType: newOrder[0]?.sort || "asc",
                    });
                }}
            />
        </Box>
    );
};

export default TransactionSourcesList;
