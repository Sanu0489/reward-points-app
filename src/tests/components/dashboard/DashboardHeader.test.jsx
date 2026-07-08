import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import DashboardHeader from "../../../components/dashboard/DashboardHeader";

describe("DashboardHeader", () => {
    it("should render dashboard title", () => {
        render(<DashboardHeader />);

        expect(
            screen.getByText("🎁 Reward Points Dashboard")
        ).toBeInTheDocument();
    });

    it("should render heading", () => {
        render(<DashboardHeader />);

        expect(
            screen.getByRole("heading", {
                name: /reward points dashboard/i,
            })
        ).toBeInTheDocument();
    });
});