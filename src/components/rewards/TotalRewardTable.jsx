import PropTypes from "prop-types";

import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

import { getDataGridStyles } from "../../styles/dataGridStyles";

const tableColumns = [
  {
    field: "customerId",
    headerName: "Customer ID",
    width: 140,
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
    field: "rewardPoints",
    headerName: "Total Reward Points",
    type: "number",
    width: 220,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <Typography
        fontWeight="bold"
        color={
          params.row.rewardPoints >= 500 ? "secondary.main" : "text.primary"
        }
      >
        {params.row.rewardPoints}
      </Typography>
    ),
  },
];

const TotalRewardTable = ({ totalRewards }) => {
  return (
      <DataGrid
        rows={totalRewards}
        columns={tableColumns}
        getRowId={(row) => row.customerId}
        pageSizeOptions={[5]}
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
        sx={getDataGridStyles("#FBF5FC", "#4A148C", "#FCF7FD")}
      />
  );
};

TotalRewardTable.propTypes = {
  totalRewards: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.number.isRequired,
      customerName: PropTypes.string.isRequired,
      rewardPoints: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default TotalRewardTable;
