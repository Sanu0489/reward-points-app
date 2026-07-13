import PropTypes from "prop-types";

import {
    Box,
    Card,
    CardContent,
    Typography,
} from "@mui/material";

/**
 * Displays a summary metric inside a reusable dashboard card.
 *
 * The card shows a title, value, and an optional icon. It is used
 * throughout the dashboard to present key statistics such as total
 * customers, total transactions, and total reward points.
 *
 * @param {Object} props - Component props.
 * @param {string} props.title - Title displayed on the card.
 * @param {string|number} props.value - Summary value to display.
 * @param {React.ReactNode} [props.icon] - Optional icon displayed on the right side of the card.
 * @param {string} [props.borderColor="#1976d2"] - Color applied to the optional icon.
 * @returns {JSX.Element} Summary card component.
 */

const SummaryCard = ({
    title,
    value,
    icon,
    borderColor = "#1976d2",
}) => {
    return (
        <Card
            elevation={2}
            sx={{
                height: "100%",
                borderRadius: 3,
                backgroundColor: "#ffffff",
                transition: "all 0.3s ease-in-out",

                "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 8,
                },
            }}
        >
            <CardContent>
                <Box
                  sx= {{
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems: "center"
                  }}
                    
                >
                    <Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                        >
                            {title}
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            {value}
                        </Typography>
                    </Box>

                    {icon && (
                        <Box
                            sx={{
                                color: borderColor,
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            {icon}
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

SummaryCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    icon: PropTypes.node,
    borderColor: PropTypes.string,
};

export default SummaryCard;