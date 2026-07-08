import PropTypes from "prop-types";

import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

import { formatDate } from "../../utils/formatDate";
import { getDataGridStyles } from "../../styles/dataGridStyles";

const tableColumns = [
    {
        field: "id",
        headerName: "Transaction ID",
        width: 150,
        align: "center",
        headerAlign: "center",
    },
    {
        field: "customerName",
        headerName: "Customer",
        flex: 1,
        minWidth: 180,
    },
    {
        field: "product",
        headerName: "Product",
        flex: 1,
        minWidth: 180,
    },
    {
        field: "purchaseDate",
        headerName: "Purchase Date",
        flex: 1,
        minWidth: 180,
        valueFormatter: (value) => formatDate(value),
    },
    {
        field: "amount",
        headerName: "Amount ($)",
        type: "number",
        width: 150,
        align: "right",
        headerAlign: "right",
        valueFormatter: (value) => `$${Number(value).toFixed(2)}`,
    },
    {
        field: "rewardPoints",
        headerName: "Reward Points",
        type: "number",
        width: 160,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
            <Typography
                sx={{
                    width: "100%",
                    textAlign: "center",
                    fontWeight: 700,
                    color:
                        params.value >= 100
                            ? "success.main"
                            : "text.primary",
                }}
            >
                {params.value}
            </Typography>
        ),
    },
];

const TransactionTable = ({ transactions }) => {
    return (
        <DataGrid
            rows={transactions}
            columns={tableColumns}
            getRowId={(row) => row.id}
            pageSizeOptions={[5, 10, 20]}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 10,
                        page: 0,
                    },
                },
            }}
            rowHeight={56}
            columnHeaderHeight={56}
            disableRowSelectionOnClick
            autoHeight
            density="comfortable"
            disableColumnMenu
            disableColumnResize={false}
            showToolbar
            sx={getDataGridStyles(
                "#F5F9FF",
                "#0D47A1",
                "#EAF4FF"
            )}
        />
    );
};

TransactionTable.propTypes = {
    transactions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            customerId: PropTypes.number.isRequired,
            customerName: PropTypes.string.isRequired,
            purchaseDate: PropTypes.string.isRequired,
            product: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            rewardPoints: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default TransactionTable;