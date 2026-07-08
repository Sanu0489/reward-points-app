export const getDataGridStyles = (
  headerBgColor,
  headerTextColor,
  hoverColor,
) => ({
  border: "1px solid #e0e0e0",
  borderRadius: 8,

  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: headerBgColor,
    borderBottom: "2px solid #d0d0d0",
  },

  "& .MuiDataGrid-columnHeader": {
    backgroundColor: headerBgColor,
    color: headerTextColor,
    fontWeight: 700,
    fontSize: 15,
  },

  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 700,
  },

  "& .MuiDataGrid-cell": {
    display: "flex",
    alignItems: "center",
    fontSize: 14,
  },

  "& .MuiDataGrid-row:nth-of-type(even)": {
    backgroundColor: "#fafafa",
  },

  "& .MuiDataGrid-row:hover": {
    backgroundColor: hoverColor,
  },
});
