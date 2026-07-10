import PropTypes from "prop-types";

import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

import dayjs from "dayjs";

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
    field: "monthKey",
    headerName: "Month",
    width: 150,
    align: "center",
    headerAlign: "center",
    valueFormatter: (value) => dayjs(value).format("MMM YYYY"),
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
  console.log(" MonthlyRewardTable monthlyRewards:", monthlyRewards);
  return (
    <DataGrid
      rows={monthlyRewards}
      columns={tableColumns}
      getRowId={(row) => `${row.customerId}-${row.monthKey}`}
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
      customerId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      customerName: PropTypes.string.isRequired,
      monthKey: PropTypes.string.isRequired,
      rewardPoints: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default MonthlyRewardTable;
