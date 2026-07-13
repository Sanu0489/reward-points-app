import { renderHook, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import usePaginationModel from "../../hooks/usePaginationModel";

describe("usePaginationModel", () => {
    it("should initialize with the provided page size", () => {
        const { result } = renderHook(() =>
            usePaginationModel(10)
        );

        expect(result.current.paginationModel).toEqual({
            page: 0,
            pageSize: 10,
        });
    });

    it("should update the page when page size remains the same", () => {
        const { result } = renderHook(() =>
            usePaginationModel(10)
        );

        act(() => {
            result.current.handlePaginationModelChange({
                page: 2,
                pageSize: 10,
            });
        });

        expect(result.current.paginationModel).toEqual({
            page: 2,
            pageSize: 10,
        });
    });

    it("should reset to the first page when page size changes", () => {
        const { result } = renderHook(() =>
            usePaginationModel(10)
        );

        act(() => {
            result.current.handlePaginationModelChange({
                page: 3,
                pageSize: 10,
            });
        });

        act(() => {
            result.current.handlePaginationModelChange({
                page: 3,
                pageSize: 20,
            });
        });

        expect(result.current.paginationModel).toEqual({
            page: 0,
            pageSize: 20,
        });
    });

    it("should update page size correctly", () => {
        const { result } = renderHook(() =>
            usePaginationModel(5)
        );

        act(() => {
            result.current.handlePaginationModelChange({
                page: 0,
                pageSize: 10,
            });
        });

        expect(result.current.paginationModel.pageSize).toBe(10);
    });

    it("should preserve page when only page changes", () => {
        const { result } = renderHook(() =>
            usePaginationModel(5)
        );

        act(() => {
            result.current.handlePaginationModelChange({
                page: 4,
                pageSize: 5,
            });
        });

        expect(result.current.paginationModel.page).toBe(4);
    });
});