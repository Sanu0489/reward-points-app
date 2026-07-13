import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ErrorFallback from "../../../components/common/ErrorFallback";

describe("ErrorFallback", () => {
    it("should render the error message", () => {
        render(
            <ErrorFallback
                error={new Error("Unexpected Error")}
                resetErrorBoundary={vi.fn()}
            />
        );

        expect(
            screen.getByText("Unexpected Error")
        ).toBeInTheDocument();
    });

    it("should call resetErrorBoundary when Retry is clicked", () => {
        const resetErrorBoundary = vi.fn();

        render(
            <ErrorFallback
                error={new Error("Unexpected Error")}
                resetErrorBoundary={resetErrorBoundary}
            />
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: /retry/i,
            })
        );

        expect(resetErrorBoundary).toHaveBeenCalledTimes(1);
    });
});