import { beforeEach, describe, expect, it, vi } from "vitest";

import apiClient from "../../api/apiClient";
import { getTransactions } from "../../api/transactionApi";
import { API_ENDPOINTS } from "../../constants/apiConstants";

// Mock apiClient
vi.mock("../../api/apiClient", () => ({
    default: {
        get: vi.fn(),
    },
}));

describe("transactionApi", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mockTransactions = [
        {
            id: 1,
            customerId: 101,
            customerName: "John Smith",
            amount: 120,
            rewardPoints: 90,
        },
        {
            id: 2,
            customerId: 102,
            customerName: "Alice Johnson",
            amount: 150,
            rewardPoints: 150,
        },
    ];

    it("should fetch all transactions successfully", async () => {
        // Arrange
        apiClient.get.mockResolvedValue({
            data: mockTransactions,
        });

        // Act
        const result = await getTransactions();

        // Assert
        expect(apiClient.get).toHaveBeenCalledTimes(1);

        expect(apiClient.get).toHaveBeenCalledWith(
            API_ENDPOINTS.TRANSACTIONS
        );

        expect(result).toEqual(mockTransactions);
    });

    it("should return an empty array when API returns no transactions", async () => {
        // Arrange
        apiClient.get.mockResolvedValue({
            data: [],
        });

        // Act
        const result = await getTransactions();

        // Assert
        expect(result).toEqual([]);
    });

    it("should throw an error when API request fails", async () => {
        // Arrange
        const error = new Error("Network Error");

        apiClient.get.mockRejectedValue(error);

        // Act + Assert
        await expect(getTransactions()).rejects.toThrow(
            "Network Error"
        );
    });

    it("should call the correct API endpoint", async () => {
        apiClient.get.mockResolvedValue({
            data: mockTransactions,
        });

        await getTransactions();

        expect(apiClient.get).toHaveBeenCalledWith(
            API_ENDPOINTS.TRANSACTIONS
        );
    });

    it("should call API only once", async () => {
        apiClient.get.mockResolvedValue({
            data: mockTransactions,
        });

        await getTransactions();

        expect(apiClient.get).toHaveBeenCalledTimes(1);
    });
});