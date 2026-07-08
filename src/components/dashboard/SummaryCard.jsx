import PropTypes from "prop-types";

import {
    Box,
    Card,
    CardContent,
    Typography,
} from "@mui/material";

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
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
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