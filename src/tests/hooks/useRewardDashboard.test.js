import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";

import useRewardDashboard from "../../hooks/useRewardDashboard";
import useTransactions from "../../hooks/useTransactions";

// Mock the custom hook
vi.mock("../../hooks/useTransactions");

describe("useRewardDashboard", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mockTransactions = [
        {
            id: 1,
            customerId: 101,
            customerName: "John Smith",
            purchaseDate: "2024-01-05",
            amount: 120,
        },
        {
            id: 2,
            customerId: 101,
            customerName: "John Smith",
            purchaseDate: "2024-01-10",
            amount: 80,
        },
        {
            id: 3,
            customerId: 102,
            customerName: "Alice Johnson",
            purchaseDate: "2024-02-15",
            amount: 150,
        },
    ];

    it("should return dashboard data successfully", () => {
        useTransactions.mockReturnValue({
            transactions: mockTransactions,
            loading: false,
            error: "",
        });

        const { result } = renderHook(() => useRewardDashboard());

        expect(result.current.loading).toBe(false);

        expect(result.current.error).toBe("");

        expect(result.current.transactionsWithRewards)
            .toHaveLength(3);

        expect(result.current.monthlyRewards.length)
            .toBeGreaterThan(0);

        expect(result.current.totalRewards.length)
            .toBeGreaterThan(0);

        expect(result.current.dashboardStats)
            .toBeDefined();
    });

    it("should return loading state", () => {
        useTransactions.mockReturnValue({
            transactions: [],
            loading: true,
            error: "",
        });

        const { result } = renderHook(() => useRewardDashboard());

        expect(result.current.loading).toBe(true);

        expect(result.current.transactionsWithRewards)
            .toEqual([]);

        expect(result.current.monthlyRewards)
            .toEqual([]);

        expect(result.current.totalRewards)
            .toEqual([]);
    });

    it("should return error state", () => {
        useTransactions.mockReturnValue({
            transactions: [],
            loading: false,
            error: "Network Error",
        });

        const { result } = renderHook(() => useRewardDashboard());

        expect(result.current.loading).toBe(false);

        expect(result.current.error)
            .toBe("Network Error");
    });

    it("should calculate reward points correctly", () => {
        useTransactions.mockReturnValue({
            transactions: mockTransactions,
            loading: false,
            error: "",
        });

        const { result } = renderHook(() => useRewardDashboard());

        expect(
            result.current.transactionsWithRewards[0].rewardPoints
        ).toBe(90);

        expect(
            result.current.transactionsWithRewards[1].rewardPoints
        ).toBe(30);

        expect(
            result.current.transactionsWithRewards[2].rewardPoints
        ).toBe(150);
    });

    it("should calculate monthly rewards", () => {
        useTransactions.mockReturnValue({
            transactions: mockTransactions,
            loading: false,
            error: "",
        });

        const { result } = renderHook(() => useRewardDashboard());

        expect(result.current.monthlyRewards.length).toBe(2);
    });

    it("should calculate total rewards", () => {
        useTransactions.mockReturnValue({
            transactions: mockTransactions,
            loading: false,
            error: "",
        });

        const { result } = renderHook(() => useRewardDashboard());

        expect(result.current.totalRewards.length).toBe(2);

        expect(
            result.current.totalRewards[0].rewardPoints
        ).toBe(120);

        expect(
            result.current.totalRewards[1].rewardPoints
        ).toBe(150);
    });

    it("should calculate dashboard statistics", () => {
        useTransactions.mockReturnValue({
            transactions: mockTransactions,
            loading: false,
            error: "",
        });

        const { result } = renderHook(() => useRewardDashboard());

        expect(result.current.dashboardStats).toBeDefined();

        expect(result.current.dashboardStats.totalCustomers)
            .toBe(2);

        expect(result.current.dashboardStats.totalTransactions)
            .toBe(3);
    });
});