import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Loader from "../../../components/common/Loader";

describe("Loader", () => {
    it("should render the loader", () => {
        render(<Loader />);

        expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("should render only one loader", () => {
        render(<Loader />);

        expect(screen.getAllByRole("progressbar")).toHaveLength(1);
    });
});