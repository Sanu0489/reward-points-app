import PropTypes from "prop-types";
import { memo } from "react";

import { Alert, Box, Button } from "@mui/material";

/**
 * Displays an error message with an optional
 * retry action for recoverable errors.
 *
 * @param {Object} props
 * @param {string} props.message - Error message to display.
 * @param {Function} props.onRetry - Callback invoked when Retry is clicked.
 * @returns {JSX.Element}
 */
const ErrorMessage = ({
    message,
    onRetry,
}) => {
    return (
        <Box my={3}>
            <Alert
                severity="error"
                variant="filled"
                role="alert"
                action={
                    <Button
                        color="inherit"
                        size="small"
                        variant="outlined"
                        onClick={onRetry}
                    >
                        Retry
                    </Button>
                }
            >
                {message}
            </Alert>
        </Box>
    );
};

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
    onRetry: PropTypes.func.isRequired,
};

export default memo(ErrorMessage);