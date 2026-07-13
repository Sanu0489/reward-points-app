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
            customerId: "C001",
            customerName: "John Smith",
            product: "Laptop",
            purchaseDate: "2026-06-05",
            amount: 120,
            rewardPoints: 90,
        },
    ];

    const mockMonthlyRewards = [
        {
            customerId: "C001",
            customerName: "John Smith",
            monthKey: "2026-06",
            monthLabel: "Jun 2026",
            rewardPoints: 90,
        },
    ];

    const mockTotalRewards = [
        {
            customerId: "C001",
            customerName: "John Smith",
            rewardPoints: 90,
        },
    ];

    const mockDashboardStats = {
        totalCustomers: 1,
        totalTransactions: 1,
        totalRewardPoints: 90,
    };

    const mockRefetch = vi.fn();

    it("should render loader while loading", () => {
        useRewardDashboard.mockReturnValue({
            loading: true,
            error: null,
            refetch: mockRefetch,
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
            error: new Error("Network Error"),
            refetch: mockRefetch,
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
            error: null,
            refetch: mockRefetch,
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
            error: null,
            refetch: mockRefetch,
            transactionsWithRewards: mockTransactions,
            monthlyRewards: mockMonthlyRewards,
            totalRewards: mockTotalRewards,
            dashboardStats: mockDashboardStats,
        });

        render(<Dashboard />);

        // Dashboard Header
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

        expect(
            screen.getByText("Total Reward Points")
        ).toBeInTheDocument();

        // Tabs
        expect(
            screen.getByRole("tab", {
                name: "Transactions",
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("tab", {
                name: "Monthly Rewards",
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("tab", {
                name: "Total Rewards",
            })
        ).toBeInTheDocument();
    });
});