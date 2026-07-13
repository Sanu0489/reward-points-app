import { describe, expect, it } from "vitest";

import { getDashboardStats } from "../../utils/dashboardUtils";

describe("getDashboardStats", () => {
    const mockTransactions = [
        {
            id: 1,
            customerId: "C001",
            rewardPoints: 90,
        },
        {
            id: 2,
            customerId: "C001",
            rewardPoints: 30,
        },
        {
            id: 3,
            customerId: "C002",
            rewardPoints: 150,
        },
        {
            id: 4,
            customerId: "C003",
            rewardPoints: 75,
        },
    ];

    it("should calculate dashboard statistics correctly", () => {
        const result = getDashboardStats(mockTransactions);

        expect(result).toEqual({
            totalCustomers: 3,
            totalTransactions: 4,
            totalRewardPoints: 345,
        });
    });

    it("should return zero statistics for empty transactions", () => {
        expect(getDashboardStats([])).toEqual({
            totalCustomers: 0,
            totalTransactions: 0,
            totalRewardPoints: 0,
        });
    });

    it("should count unique customers only", () => {
        const result = getDashboardStats(mockTransactions);

        expect(result.totalCustomers).toBe(3);
    });

    it("should count total transactions", () => {
        const result = getDashboardStats(mockTransactions);

        expect(result.totalTransactions).toBe(4);
    });

    it("should calculate total reward points", () => {
        const result = getDashboardStats(mockTransactions);

        expect(result.totalRewardPoints).toBe(345);
    });

    it("should calculate statistics for a single transaction", () => {
        const result = getDashboardStats([
            {
                customerId: "C001",
                rewardPoints: 100,
            },
        ]);

        expect(result).toEqual({
            totalCustomers: 1,
            totalTransactions: 1,
            totalRewardPoints: 100,
        });
    });

    it("should handle transactions with zero reward points", () => {
        const result = getDashboardStats([
            {
                customerId: "C001",
                rewardPoints: 0,
            },
            {
                customerId: "C002",
                rewardPoints: 0,
            },
        ]);

        expect(result).toEqual({
            totalCustomers: 2,
            totalTransactions: 2,
            totalRewardPoints: 0,
        });
    });
});