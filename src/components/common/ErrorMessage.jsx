import PropTypes from "prop-types";
import { Alert, Box } from "@mui/material";

const ErrorMessage = ({ message }) => {
    return (
        <Box my={3}>
            <Alert severity="error" variant="filled">
                {message}
            </Alert>
        </Box>
    );
};

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
};

export default ErrorMessage;