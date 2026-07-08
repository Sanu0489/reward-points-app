import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import TotalRewardTable from "../../components/rewards/TotalRewardTable";

describe("TotalRewardTable", () => {
    const mockTotalRewards = [
        {
            customerId: 101,
            customerName: "John Smith",
            rewardPoints: 120,
        },
        {
            customerId: 102,
            customerName: "Alice Johnson",
            rewardPoints: 375,
        },
    ];

    it("should render the DataGrid", () => {
        render(
            <TotalRewardTable
                totalRewards={mockTotalRewards}
            />
        );

        expect(
            screen.getByRole("grid")
        ).toBeInTheDocument();
    });

    it("should render all column headers", () => {
        render(
            <TotalRewardTable
                totalRewards={mockTotalRewards}
            />
        );

        expect(
            screen.getByText("Customer ID")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Customer Name")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Total Reward Points")
        ).toBeInTheDocument();
    });

    it("should render customer names", () => {
        render(
            <TotalRewardTable
                totalRewards={mockTotalRewards}
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
            <TotalRewardTable
                totalRewards={mockTotalRewards}
            />
        );

        expect(
            screen.getByText("120")
        ).toBeInTheDocument();

        expect(
            screen.getByText("375")
        ).toBeInTheDocument();
    });

    it("should render all customer rows", () => {
        render(
            <TotalRewardTable
                totalRewards={mockTotalRewards}
            />
        );

        expect(
            screen.getAllByRole("row").length
        ).toBeGreaterThan(2);
    });

    it("should render exactly two customer records", () => {
        render(
            <TotalRewardTable
                totalRewards={mockTotalRewards}
            />
        );

        expect(
            screen.getAllByText(/John Smith|Alice Johnson/)
        ).toHaveLength(2);
    });
});