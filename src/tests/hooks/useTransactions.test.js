import {
    renderHook,
    waitFor,
    act,
} from "@testing-library/react";

import {
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from "vitest";

import useTransactions from "../../hooks/useTransactions";
import { getTransactions } from "../../api/transactionApi";

vi.mock("../../api/transactionApi", () => ({
    getTransactions: vi.fn(),
}));

describe("useTransactions", () => {
    beforeEach(() => {
        vi.clearAllMocks();
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

    it("should initialize with loading=true", () => {
        getTransactions.mockResolvedValue([]);

        const { result } = renderHook(() =>
            useTransactions()
        );

        expect(result.current.loading).toBe(true);
        expect(result.current.transactions).toEqual([]);
        expect(result.current.error).toBeNull();
    });

    it("should fetch transactions successfully", async () => {
        getTransactions.mockResolvedValue(
            mockTransactions
        );

        const { result } = renderHook(() =>
            useTransactions()
        );

        await waitFor(() =>
            expect(result.current.loading).toBe(false)
        );

        expect(result.current.transactions).toEqual(
            mockTransactions
        );

        expect(result.current.error).toBeNull();

        expect(getTransactions).toHaveBeenCalledWith(
            expect.any(AbortSignal)
        );
    });

    it("should set error when API fails", async () => {
        getTransactions.mockRejectedValue(
            new Error("Network Error")
        );

        const { result } = renderHook(() =>
            useTransactions()
        );

        await waitFor(() =>
            expect(result.current.loading).toBe(false)
        );

        expect(result.current.transactions).toEqual([]);

        expect(result.current.error).toBeInstanceOf(
            Error
        );

        expect(result.current.error.message).toBe(
            "Network Error"
        );
    });

    it("should refetch transactions", async () => {
        getTransactions.mockResolvedValue(
            mockTransactions
        );

        const { result } = renderHook(() =>
            useTransactions()
        );

        await waitFor(() =>
            expect(result.current.loading).toBe(false)
        );

        await act(async () => {
            await result.current.refetch();
        });

        expect(getTransactions).toHaveBeenCalledTimes(2);
    });
});