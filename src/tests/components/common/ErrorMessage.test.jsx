import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ErrorMessage from "../../../components/common/ErrorMessage";

describe("ErrorMessage", () => {
    it("should render the error message", () => {
        render(
            <ErrorMessage message="Network Error" />
        );

        expect(
            screen.getByText("Network Error")
        ).toBeInTheDocument();
    });

    it("should render an alert", () => {
        render(
            <ErrorMessage message="Something went wrong" />
        );

        expect(
            screen.getByRole("alert")
        ).toBeInTheDocument();
    });

    it("should display the correct error message", () => {
        const message = "API Failed";

        render(
            <ErrorMessage message={message} />
        );

        expect(
            screen.getByText(message)
        ).toBeInTheDocument();
    });
});