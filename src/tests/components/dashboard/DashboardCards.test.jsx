import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import DashboardCards from "../../../components/dashboard/DashboardCards";

describe("DashboardCards", () => {
    it("should render all three dashboard cards", () => {
        render(
            <DashboardCards
                totalCustomers={5}
                totalTransactions={15}
                totalRewardPoints={1200}
            />
        );

        expect(
            screen.getByText("Total Customers")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Total Transactions")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Total Reward Points")
        ).toBeInTheDocument();
    });

    it("should render dashboard values", () => {
        render(
            <DashboardCards
                totalCustomers={5}
                totalTransactions={15}
                totalRewardPoints={1200}
            />
        );

        expect(screen.getByText("5")).toBeInTheDocument();

        expect(screen.getByText("15")).toBeInTheDocument();

        expect(screen.getByText("1200")).toBeInTheDocument();
    });

    it("should render exactly three cards", () => {
        const { container } = render(
            <DashboardCards
                totalCustomers={5}
                totalTransactions={15}
                totalRewardPoints={1200}
            />
        );

        expect(
            container.querySelectorAll(".MuiCard-root")
        ).toHaveLength(3);
    });
});