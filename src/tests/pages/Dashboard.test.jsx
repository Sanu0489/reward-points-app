import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Dashboard from "../../pages/Dashboard";
import useRewardDashboard from "../../hooks/useRewardDashboard";

vi.mock("../../hooks/useRewardDashboard");

describe("Dashboard", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mockTransactions = [
        {
            id: 1,
            customerId: 101,
            customerName: "John Smith",
            product: "Laptop",
            purchaseDate: "2024-01-05",
            amount: 120,
            rewardPoints: 90,
        },
    ];

    const mockMonthlyRewards = [
        {
            customerId: 101,
            customerName: "John Smith",
            month: "Jan",
            year: 2024,
            rewardPoints: 90,
        },
    ];

    const mockTotalRewards = [
        {
            customerId: 101,
            customerName: "John Smith",
            rewardPoints: 90,
        },
    ];

    const mockDashboardStats = {
        totalCustomers: 1,
        totalTransactions: 1,
        totalRewardPoints: 90,
    };

    it("should render loader while loading", () => {
        useRewardDashboard.mockReturnValue({
            loading: true,
            error: "",
            transactionsWithRewards: [],
            monthlyRewards: [],
            totalRewards: [],
            dashboardStats: {},
        });

        render(<Dashboard />);

        expect(
            screen.getByRole("progressbar")
        ).toBeInTheDocument();
    });

    it("should render error message", () => {
        useRewardDashboard.mockReturnValue({
            loading: false,
            error: "Network Error",
            transactionsWithRewards: [],
            monthlyRewards: [],
            totalRewards: [],
            dashboardStats: {},
        });

        render(<Dashboard />);

        expect(
            screen.getByRole("alert")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Network Error")
        ).toBeInTheDocument();
    });

    it("should render empty state", () => {
        useRewardDashboard.mockReturnValue({
            loading: false,
            error: "",
            transactionsWithRewards: [],
            monthlyRewards: [],
            totalRewards: [],
            dashboardStats: {},
        });

        render(<Dashboard />);

        expect(
            screen.getByText("No Transactions Found")
        ).toBeInTheDocument();

        expect(
            screen.getByText("No transactions are available.")
        ).toBeInTheDocument();
    });

    it("should render dashboard successfully", () => {
        useRewardDashboard.mockReturnValue({
            loading: false,
            error: "",
            transactionsWithRewards: mockTransactions,
            monthlyRewards: mockMonthlyRewards,
            totalRewards: mockTotalRewards,
            dashboardStats: mockDashboardStats,
        });

        render(<Dashboard />);

        // Header
        expect(
            screen.getByRole("heading", {
                name: /reward points dashboard/i,
            })
        ).toBeInTheDocument();

        // Summary Cards
        expect(
            screen.getByText("Total Customers")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Total Transactions")
        ).toBeInTheDocument();

        // Appears twice (Summary Card + Table Header)
        expect(
            screen.getAllByText("Total Reward Points").length
        ).toBeGreaterThan(0);

        // Section Titles
        expect(
            screen.getByText("Transactions")
        ).toBeInTheDocument();

        expect(
            screen.getByText("User Monthly Rewards")
        ).toBeInTheDocument();

        expect(
            screen.getByText("User Total Rewards")
        ).toBeInTheDocument();

        // Data
        expect(
            screen.getAllByText("John Smith").length
        ).toBeGreaterThan(0);

        expect(
            screen.getByText("Laptop")
        ).toBeInTheDocument();
    });
});