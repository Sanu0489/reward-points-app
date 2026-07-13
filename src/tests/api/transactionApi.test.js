import { beforeEach, describe, expect, it, vi } from "vitest";

import { getTransactions } from "../../api/transactionApi";

describe("transactionApi", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    const mockTransactions = [
        {
            id: 1,
            customerId: "C001",
            firstName: "John",
            lastName: "Smith",
            amount: 120,
        },
        {
            id: 2,
            customerId: "C002",
            firstName: "Alice",
            lastName: "Johnson",
            amount: 150,
        },
    ];

    it("should fetch all transactions successfully", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({
                transactions: mockTransactions,
            }),
        });

        const result = await getTransactions();

        expect(globalThis.fetch).toHaveBeenCalledTimes(1);
        expect(globalThis.fetch).toHaveBeenCalledWith("/db.json", {
            signal: undefined,
        });

        expect(result).toEqual(mockTransactions);
    });

    it("should return an empty array when no transactions exist", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({
                transactions: [],
            }),
        });

        const result = await getTransactions();

        expect(result).toEqual([]);
    });

    it("should throw an error when fetch fails", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValue({
            ok: false,
        });

        await expect(getTransactions()).rejects.toThrow(
            "Failed to fetch transactions."
        );
    });

    it("should throw an error for an invalid response", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({
                data: [],
            }),
        });

        await expect(getTransactions()).rejects.toThrow(
            "Invalid transactions response."
        );
    });

    it("should pass AbortSignal to fetch", async () => {
        const controller = new AbortController();

        vi.spyOn(globalThis, "fetch").mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({
                transactions: mockTransactions,
            }),
        });

        await getTransactions(controller.signal);

        expect(globalThis.fetch).toHaveBeenCalledWith("/db.json", {
            signal: controller.signal,
        });
    });

    it("should throw when transactions is not an array", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({
                transactions: null,
            }),
        });

        await expect(getTransactions()).rejects.toThrow(
            "Invalid transactions response."
        );
    });
});