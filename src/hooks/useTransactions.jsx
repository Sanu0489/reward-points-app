import { useCallback, useEffect, useState } from "react";
import { getTransactions } from "../api/transactionApi";

const useTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchTransactions = useCallback(async () => {
    try {
        setLoading(true);
        setError("");

        const data = await getTransactions();
        setTransactions(data);
    } catch (err) {
        setError(err?.message || "Failed to fetch transactions.");
    } finally {
        setLoading(false);
    }
}, []);

useEffect(() => {
    const fetchData = async () => {
        await fetchTransactions();
    };

    fetchData();
}, [fetchTransactions]);

    return {
        transactions,
        loading,
        error,
        refetch: fetchTransactions,
    };
};

export default useTransactions;