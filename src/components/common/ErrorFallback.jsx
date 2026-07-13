import PropTypes from "prop-types";
import { memo } from "react";

import ErrorMessage from "./ErrorMessage";

/**
 * Displays a fallback UI when an unexpected
 * rendering error is caught by the ErrorBoundary.
 *
 * @param {Object} props
 * @param {Error} props.error - Error thrown during rendering.
 * @param {Function} props.resetErrorBoundary - Resets the ErrorBoundary state.
 * @returns {JSX.Element}
 */
const ErrorFallback = ({
    error,
    resetErrorBoundary,
}) => {
    return (
        <ErrorMessage
            message={error.message}
            onRetry={resetErrorBoundary}
        />
    );
};

ErrorFallback.propTypes = {
    error: PropTypes.instanceOf(Error).isRequired,
    resetErrorBoundary: PropTypes.func.isRequired,
};

export default memo(ErrorFallback);