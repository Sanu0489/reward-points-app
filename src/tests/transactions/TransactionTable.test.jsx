import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import TransactionTable from "../../components/transactions/TransactionTable";

describe("TransactionTable", () => {
    const mockTransactions = [
        {
            id: 1,
            customerId: "C001",
            customerName: "John Smith",
            product: "Laptop",
            purchaseDate: "2026-06-05",
            amount: 120,
            rewardPoints: 90,
        },
        {
            id: 2,
            customerId: "C002",
            customerName: "Alice Johnson",
            product: "Mouse",
            purchaseDate: "2026-05-15",
            amount: 150,
            rewardPoints: 150,
        },
    ];

    it("should render DataGrid", () => {
        render(
            <TransactionTable
                transactions={mockTransactions}
            />
        );

        expect(
            screen.getByRole("grid")
        ).toBeInTheDocument();
    });

    it("should render all column headers", () => {
        render(
            <TransactionTable
                transactions={mockTransactions}
            />
        );

        expect(
            screen.getByText("Transaction ID")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Customer")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Product")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Purchase Date")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Amount ($)")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Reward Points")
        ).toBeInTheDocument();
    });

    it("should render transaction data", () => {
        render(
            <TransactionTable
                transactions={mockTransactions}
            />
        );

        expect(
            screen.getByText("John Smith")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Alice Johnson")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Laptop")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Mouse")
        ).toBeInTheDocument();
    });

    it("should format purchase dates", () => {
        render(
            <TransactionTable
                transactions={mockTransactions}
            />
        );

        expect(
            screen.getByText("Jun 5, 2026")
        ).toBeInTheDocument();

        expect(
            screen.getByText("May 15, 2026")
        ).toBeInTheDocument();
    });

    it("should format amounts", () => {
        render(
            <TransactionTable
                transactions={mockTransactions}
            />
        );

        expect(
            screen.getByText("$120.00")
        ).toBeInTheDocument();

        expect(
            screen.getByText("$150.00")
        ).toBeInTheDocument();
    });

    it("should render reward points", () => {
        render(
            <TransactionTable
                transactions={mockTransactions}
            />
        );

        expect(
            screen.getByText("90")
        ).toBeInTheDocument();

        expect(
            screen.getByText("150")
        ).toBeInTheDocument();
    });

    it("should render all customer rows", () => {
        render(
            <TransactionTable
                transactions={mockTransactions}
            />
        );

        expect(
            screen.getAllByRole("row").length
        ).toBeGreaterThan(2);
    });

    it("should render two transactions", () => {
        render(
            <TransactionTable
                transactions={mockTransactions}
            />
        );

        expect(
            screen.getAllByText(/John Smith|Alice Johnson/)
        ).toHaveLength(2);
    });
});