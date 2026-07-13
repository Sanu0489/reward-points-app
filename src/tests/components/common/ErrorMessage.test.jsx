import {
    fireEvent,
    render,
    screen,
} from "@testing-library/react";

import { describe, expect, it, vi } from "vitest";

import ErrorMessage from "../../../components/common/ErrorMessage";

describe("ErrorMessage", () => {
    it("should render the error message", () => {
        render(
            <ErrorMessage
                message="Network Error"
                onRetry={vi.fn()}
            />
        );

        expect(
            screen.getByText("Network Error")
        ).toBeInTheDocument();
    });

    it("should render an alert", () => {
        render(
            <ErrorMessage
                message="Something went wrong"
                onRetry={vi.fn()}
            />
        );

        expect(
            screen.getByRole("alert")
        ).toBeInTheDocument();
    });

    it("should display the correct error message", () => {
        const message = "API Failed";

        render(
            <ErrorMessage
                message={message}
                onRetry={vi.fn()}
            />
        );

        expect(
            screen.getByText(message)
        ).toBeInTheDocument();
    });

    it("should render Retry button", () => {
        render(
            <ErrorMessage
                message="Network Error"
                onRetry={vi.fn()}
            />
        );

        expect(
            screen.getByRole("button", {
                name: /retry/i,
            })
        ).toBeInTheDocument();
    });

    it("should invoke onRetry when Retry button is clicked", () => {
        const onRetry = vi.fn();

        render(
            <ErrorMessage
                message="Network Error"
                onRetry={onRetry}
            />
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: /retry/i,
            })
        );

        expect(onRetry).toHaveBeenCalledTimes(1);
    });
});