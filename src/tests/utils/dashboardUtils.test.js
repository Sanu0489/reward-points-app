import { describe, expect, it } from "vitest";

import { getDashboardStats } from "../../utils/dashboardUtils";

describe("getDashboardStats", () => {
    const mockTransactions = [
        {
            id: 1,
            customerId: 101,
            rewardPoints: 90,
        },
        {
            id: 2,
            customerId: 101,
            rewardPoints: 30,
        },
        {
            id: 3,
            customerId: 102,
            rewardPoints: 150,
        },
        {
            id: 4,
            customerId: 103,
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
        const result = getDashboardStats([]);

        expect(result).toEqual({
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
});