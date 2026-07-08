import PropTypes from "prop-types";

import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

import { getDataGridStyles } from "../../styles/dataGridStyles";

const tableColumns = [
  {
    field: "customerId",
    headerName: "Customer ID",
    width: 130,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "customerName",
    headerName: "Customer Name",
    flex: 1,
    minWidth: 220,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "month",
    headerName: "Month",
    width: 120,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "year",
    headerName: "Year",
    width: 100,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "rewardPoints",
    headerName: "Reward Points",
    type: "number",
    width: 170,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <Typography
        fontWeight="bold"
        color={params.row.rewardPoints >= 100 ? "success.main" : "text.primary"}
      >
        {params.row.rewardPoints}
      </Typography>
    ),
  },
];

const MonthlyRewardTable = ({ monthlyRewards }) => {
  return (
      <DataGrid
        rows={monthlyRewards}
        columns={tableColumns}
        getRowId={(row) => `${row.customerId}-${row.month}-${row.year}`}
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
              page: 0,
            },
          },
        }}
        disableRowSelectionOnClick
        autoHeight
        density="comfortable"
        disableColumnMenu
        disableColumnResize={false}
        showToolbar
        sx={getDataGridStyles("#F4FBF4", "#1B5E20", "#EEF9EE")}
      />
  );
};

MonthlyRewardTable.propTypes = {
  monthlyRewards: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.number.isRequired,
      customerName: PropTypes.string.isRequired,
      month: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      rewardPoints: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default MonthlyRewardTable;
