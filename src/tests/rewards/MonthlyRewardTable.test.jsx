import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import MonthlyRewardTable from "../../components/rewards/MonthlyRewardTable";

describe("MonthlyRewardTable", () => {
    const mockMonthlyRewards = [
        {
            customerId: 101,
            customerName: "John Smith",
            month: "Jan",
            year: 2024,
            rewardPoints: 90,
        },
        {
            customerId: 102,
            customerName: "Alice Johnson",
            month: "Feb",
            year: 2024,
            rewardPoints: 150,
        },
    ];

    it("should render the DataGrid", () => {
        render(
            <MonthlyRewardTable monthlyRewards={mockMonthlyRewards} />
        );

        expect(screen.getByRole("grid")).toBeInTheDocument();
    });

    it("should render all column headers", () => {
        render(
            <MonthlyRewardTable monthlyRewards={mockMonthlyRewards} />
        );

        expect(screen.getByText("Customer ID")).toBeInTheDocument();
        expect(screen.getByText("Customer Name")).toBeInTheDocument();
        expect(screen.getByText("Month")).toBeInTheDocument();
        expect(screen.getByText("Year")).toBeInTheDocument();
        expect(screen.getByText("Reward Points")).toBeInTheDocument();
    });

    it("should render customer names", () => {
        render(
            <MonthlyRewardTable monthlyRewards={mockMonthlyRewards} />
        );

        expect(screen.getByText("John Smith")).toBeInTheDocument();
        expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    });

    it("should render reward points", () => {
        render(
            <MonthlyRewardTable monthlyRewards={mockMonthlyRewards} />
        );

        expect(screen.getByText("90")).toBeInTheDocument();
        expect(screen.getByText("150")).toBeInTheDocument();
    });

    it("should render month values", () => {
        render(
            <MonthlyRewardTable monthlyRewards={mockMonthlyRewards} />
        );

        expect(screen.getByText("Jan")).toBeInTheDocument();
        expect(screen.getByText("Feb")).toBeInTheDocument();
    });

    it("should render year values", () => {
        render(
            <MonthlyRewardTable monthlyRewards={mockMonthlyRewards} />
        );

        expect(screen.getAllByText("2024")).toHaveLength(2);
    });

    it("should render all customer rows", () => {
        render(
            <MonthlyRewardTable monthlyRewards={mockMonthlyRewards} />
        );

        expect(screen.getAllByRole("row").length).toBeGreaterThan(2);
    });
});