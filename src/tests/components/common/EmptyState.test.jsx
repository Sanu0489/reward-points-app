import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import EmptyState from "../../../components/common/EmptyState";

describe("EmptyState", () => {
    it("should render default title", () => {
        render(<EmptyState />);

        expect(
            screen.getByText("No Data Available")
        ).toBeInTheDocument();
    });

    it("should render default description", () => {
        render(<EmptyState />);

        expect(
            screen.getByText("No transactions found.")
        ).toBeInTheDocument();
    });

    it("should render custom title", () => {
        render(
            <EmptyState
                title="No Rewards Found"
            />
        );

        expect(
            screen.getByText("No Rewards Found")
        ).toBeInTheDocument();
    });

    it("should render custom description", () => {
        render(
            <EmptyState
                description="No monthly rewards available."
            />
        );

        expect(
            screen.getByText(
                "No monthly rewards available."
            )
        ).toBeInTheDocument();
    });

    it("should render custom title and description", () => {
        render(
            <EmptyState
                title="Empty Dashboard"
                description="Nothing to display."
            />
        );

        expect(
            screen.getByText("Empty Dashboard")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Nothing to display.")
        ).toBeInTheDocument();
    });
});