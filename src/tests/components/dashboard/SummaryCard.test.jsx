import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import SummaryCard from "../../../components/dashboard/SummaryCard";

describe("SummaryCard", () => {
    it("should render title", () => {
        render(
            <SummaryCard
                title="Total Customers"
                value={5}
            />
        );

        expect(
            screen.getByText("Total Customers")
        ).toBeInTheDocument();
    });

    it("should render numeric value", () => {
        render(
            <SummaryCard
                title="Total Customers"
                value={5}
            />
        );

        expect(
            screen.getByText("5")
        ).toBeInTheDocument();
    });

    it("should render string value", () => {
        render(
            <SummaryCard
                title="Status"
                value="Completed"
            />
        );

        expect(
            screen.getByText("Completed")
        ).toBeInTheDocument();
    });

    it("should render icon when supplied", () => {
        render(
            <SummaryCard
                title="Rewards"
                value={500}
                icon={<TrendingUpIcon data-testid="summary-icon" />}
            />
        );

        expect(
            screen.getByTestId("summary-icon")
        ).toBeInTheDocument();
    });

    it("should not render icon when not supplied", () => {
        render(
            <SummaryCard
                title="Rewards"
                value={500}
            />
        );

        expect(
            screen.queryByTestId("summary-icon")
        ).not.toBeInTheDocument();
    });
});