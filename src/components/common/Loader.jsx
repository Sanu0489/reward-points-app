import { memo } from "react";

import { Box, CircularProgress } from "@mui/material";

/**
 * Displays a centered loading spinner while
 * asynchronous data is being fetched.
 *
 * @returns {JSX.Element}
 */
const Loader = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 300,
            }}
        >
            <CircularProgress
                aria-label="loading"
            />
        </Box>
    );
};

export default memo(Loader);