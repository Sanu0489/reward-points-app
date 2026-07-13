import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import MonthlyRewardTable from "../../components/rewards/MonthlyRewardTable";

describe("MonthlyRewardTable", () => {
    const mockMonthlyRewards = [
        {
            customerId: "C001",
            customerName: "John Smith",
            monthKey: "2026-06",
            monthLabel: "Jun 2026",
            rewardPoints: 90,
        },
        {
            customerId: "C002",
            customerName: "Alice Johnson",
            monthKey: "2026-05",
            monthLabel: "May 2026",
            rewardPoints: 150,
        },
    ];

    it("should render the DataGrid", () => {
        render(
            <MonthlyRewardTable
                monthlyRewards={mockMonthlyRewards}
            />
        );

        expect(
            screen.getByRole("grid")
        ).toBeInTheDocument();
    });

    it("should render all column headers", () => {
        render(
            <MonthlyRewardTable
                monthlyRewards={mockMonthlyRewards}
            />
        );

        expect(
            screen.getByText("Customer ID")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Customer Name")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Month")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Reward Points")
        ).toBeInTheDocument();
    });

    it("should render customer names", () => {
        render(
            <MonthlyRewardTable
                monthlyRewards={mockMonthlyRewards}
            />
        );

        expect(
            screen.getByText("John Smith")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Alice Johnson")
        ).toBeInTheDocument();
    });

    it("should render reward points", () => {
        render(
            <MonthlyRewardTable
                monthlyRewards={mockMonthlyRewards}
            />
        );

        expect(
            screen.getByText("90")
        ).toBeInTheDocument();

        expect(
            screen.getByText("150")
        ).toBeInTheDocument();
    });

    it("should render month labels", () => {
        render(
            <MonthlyRewardTable
                monthlyRewards={mockMonthlyRewards}
            />
        );

        expect(
            screen.getByText("Jun 2026")
        ).toBeInTheDocument();

        expect(
            screen.getByText("May 2026")
        ).toBeInTheDocument();
    });

    it("should render all customer rows", () => {
        render(
            <MonthlyRewardTable
                monthlyRewards={mockMonthlyRewards}
            />
        );

        expect(
            screen.getAllByRole("row").length
        ).toBeGreaterThan(2);
    });
});