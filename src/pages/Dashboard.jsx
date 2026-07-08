import useTransactions from "../hooks/useTransactions";

const Dashboard = () => {
    const {
        transactions,
        loading,
        error,
    } = useTransactions();

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <>
            <h1>Reward Points Dashboard</h1>

            <pre>
                {JSON.stringify(transactions, null, 2)}
            </pre>
        </>
    );
};

export default Dashboard;