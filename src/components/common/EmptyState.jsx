import PropTypes from "prop-types";
import { memo } from "react";
import { Box, Paper, Typography } from "@mui/material";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";

/**
 * Displays a reusable empty state when
 * no data is available.
 *
 * @param {Object} props
 * @param {string} [props.title="No Data Available"] - Empty state title.
 * @param {string} [props.description="No transactions found."] - Empty state description.
 * @returns {JSX.Element}
 */

const EmptyState = ({
  title = "No Data Available",
  description = "No transactions found.",
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 4,
        mt: 3,
        textAlign: "center",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <InboxOutlinedIcon color="disabled" sx={{ fontSize: 64 }} />

        <Typography variant="h6">{title}</Typography>

        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </Paper>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default memo(EmptyState);
