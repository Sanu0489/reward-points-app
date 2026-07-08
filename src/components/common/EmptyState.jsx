import PropTypes from "prop-types";
import { Box, Paper, Typography } from "@mui/material";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";

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
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
            >
                <InboxOutlinedIcon
                    color="disabled"
                    sx={{ fontSize: 64 }}
                />

                <Typography variant="h6">
                    {title}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
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

export default EmptyState;