import { useState } from "react";

/**
 * Manages the pagination state for MUI DataGrid.
 *
 * Automatically resets the current page to the first page whenever
 * the selected page size changes.
 *
 * @param {number} initialPageSize - Initial number of rows displayed per page.
 * @returns {{
 *   paginationModel: {
 *     page: number,
 *     pageSize: number
 *   },
 *   handlePaginationModelChange: (model: {
 *     page: number,
 *     pageSize: number
 *   }) => void
 * }}
 */

const usePaginationModel = (initialPageSize) => {
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: initialPageSize,
    });

    const handlePaginationModelChange = ({ page, pageSize }) => {
        setPaginationModel((previous) => ({
            page:
                previous.pageSize !== pageSize
                    ? 0
                    : page,
            pageSize: pageSize,
        }));
    };

    return {
        paginationModel,
        handlePaginationModelChange,
    };
};

export default usePaginationModel;