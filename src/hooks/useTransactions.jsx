import { useCallback, useEffect, useState } from "react";

import { getTransactions } from "../api/transactionApi";

/**
 * Fetches and manages transaction data for the dashboard.
 *
 * Handles:
 * - Initial transaction loading
 * - Loading state
 * - Error state
 * - Manual refetch
 * - Request cancellation using AbortController
 *
 * @returns {{
 *   transactions: Array<Object>,
 *   loading: boolean,
 *   error: Error | null,
 *   refetch: Function
 * }}
 */

const useTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTransactions = useCallback(async (signal) => {
        try {
            const data = await getTransactions(signal);

            setTransactions(data);
            console.log("useTransactions data:", data.length);
            setError(null);
        } catch (err) {
            if (err instanceof Error && err.name !== "AbortError") {
                setError(err);
            }
        } finally {
                setLoading(false);
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        fetchTransactions(controller.signal);

        return () => controller.abort();
    }, [fetchTransactions]);

    const refetch = useCallback(async () => {
        console.log("Refetching transactions...");
        setLoading(true);

        const controller = new AbortController();

        await fetchTransactions(controller.signal);
    }, [fetchTransactions]);

    return {
        transactions,
        loading,
        error,
        refetch,
    };
};

export default useTransactions;