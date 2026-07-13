import { Typography } from "@mui/material";

/**
 * Renders the dashboard title.
 *
 * @returns {JSX.Element} Dashboard header component.
 */
const DashboardHeader = () => {
    return (
        <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
        >
            🎁 Reward Points Dashboard
        </Typography>
    );
};

export default DashboardHeader;