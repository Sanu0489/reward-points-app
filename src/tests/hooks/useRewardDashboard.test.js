import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import useRewardDashboard from "../../hooks/useRewardDashboard";
import useTransactions from "../../hooks/useTransactions";

vi.mock("../../hooks/useTransactions");

describe("useRewardDashboard", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mockTransactions = [
        {
            id: 1,
            customerId: "C001",
            firstName: "John",
            lastName: "Smith",
            purchaseDate: "2026-06-05",
            amount: 120,
        },
        {
            id: 2,
            customerId: "C001",
            firstName: "John",
            lastName: "Smith",
            purchaseDate: "2026-06-10",
            amount: 80,
        },
        {
            id: 3,
            customerId: "C002",
            firstName: "Alice",
            lastName: "Johnson",
            purchaseDate: "2026-05-15",
            amount: 150,
        },
    ];

    const mockRefetch = vi.fn();

    it("should return dashboard data successfully", () => {
        useTransactions.mockReturnValue({
            transactions: mockTransactions,
            loading: false,
            error: null,
            refetch: mockRefetch,
        });

        const { result } = renderHook(() => useRewardDashboard());

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();

        expect(result.current.transactionsWithRewards).toHaveLength(3);
        expect(result.current.monthlyRewards).toHaveLength(2);
        expect(result.current.totalRewards).toHaveLength(2);

        expect(result.current.dashboardStats).toEqual({
            totalCustomers: 2,
            totalTransactions: 3,
            totalRewardPoints: 270,
        });

        expect(result.current.refetch).toBe(mockRefetch);
    });

    it("should return loading state", () => {
        useTransactions.mockReturnValue({
            transactions: [],
            loading: true,
            error: null,
            refetch: mockRefetch,
        });

        const { result } = renderHook(() => useRewardDashboard());

        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBeNull();

        expect(result.current.transactionsWithRewards).toEqual([]);
        expect(result.current.monthlyRewards).toEqual([]);
        expect(result.current.totalRewards).toEqual([]);
    });

    it("should return error state", () => {
        const error = new Error("Network Error");

        useTransactions.mockReturnValue({
            transactions: [],
            loading: false,
            error,
            refetch: mockRefetch,
        });

        const { result } = renderHook(() => useRewardDashboard());

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(error);
        expect(result.current.error.message).toBe("Network Error");
    });

    it("should calculate reward points correctly", () => {
        useTransactions.mockReturnValue({
            transactions: mockTransactions,
            loading: false,
            error: null,
            refetch: mockRefetch,
        });

        const { result } = renderHook(() => useRewardDashboard());

        expect(result.current.transactionsWithRewards[0].rewardPoints).toBe(90);
        expect(result.current.transactionsWithRewards[1].rewardPoints).toBe(30);
        expect(result.current.transactionsWithRewards[2].rewardPoints).toBe(150);
    });

    it("should generate customer names", () => {
        useTransactions.mockReturnValue({
            transactions: mockTransactions,
            loading: false,
            error: null,
            refetch: mockRefetch,
        });

        const { result } = renderHook(() => useRewardDashboard());

        expect(
            result.current.transactionsWithRewards[0].customerName
        ).toBe("John Smith");

        expect(
            result.current.transactionsWithRewards[2].customerName
        ).toBe("Alice Johnson");
    });

    it("should calculate monthly rewards", () => {
        useTransactions.mockReturnValue({
            transactions: mockTransactions,
            loading: false,
            error: null,
            refetch: mockRefetch,
        });

        const { result } = renderHook(() => useRewardDashboard());

        expect(result.current.monthlyRewards).toHaveLength(2);
    });

    it("should calculate total rewards", () => {
        useTransactions.mockReturnValue({
            transactions: mockTransactions,
            loading: false,
            error: null,
            refetch: mockRefetch,
        });

        const { result } = renderHook(() => useRewardDashboard());

        expect(result.current.totalRewards).toHaveLength(2);

        const john = result.current.totalRewards.find(
            (reward) => reward.customerId === "C001"
        );

        const alice = result.current.totalRewards.find(
            (reward) => reward.customerId === "C002"
        );

        expect(john.rewardPoints).toBe(120);
        expect(alice.rewardPoints).toBe(150);
    });

    it("should calculate dashboard statistics", () => {
        useTransactions.mockReturnValue({
            transactions: mockTransactions,
            loading: false,
            error: null,
            refetch: mockRefetch,
        });

        const { result } = renderHook(() => useRewardDashboard());

        expect(result.current.dashboardStats).toEqual({
            totalCustomers: 2,
            totalTransactions: 3,
            totalRewardPoints: 270,
        });
    });
});