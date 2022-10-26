import { TablePagination } from "@mui/material";
import { ReactElement, useCallback } from "react";
import TablePaginationActions from "./PaginationAction";
import React from "react";
import { TableInstance } from "react-table";

type PaginationProps<T extends object> = {
  instance: TableInstance<T>;
};

function Pagination<T extends object>({
  instance,
}: PaginationProps<T>): ReactElement {
  const {
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = instance;

  const handleChangePage = useCallback(
    (_: any, newPage: number) => {
      if (newPage === pageIndex + 1) {
        nextPage();
      } else if (newPage === pageIndex - 1) {
        previousPage();
      } else {
        gotoPage(newPage);
      }
    },
    [gotoPage, nextPage, pageIndex, previousPage]
  );

  const handleChangeRowsPerPage = useCallback(
    (e: any) => {
      setPageSize(Number(e.target.value));
    },
    [setPageSize]
  );

  return (
    <TablePagination
      rowsPerPageOptions={[10, 50, 100, { label: "All", value: 9999 }]}
      colSpan={instance.allColumns.length}
      count={pageCount}
      rowsPerPage={pageSize}
      page={pageIndex}
      SelectProps={{
        inputProps: {
          "aria-label": "rows per page",
        },
        native: true,
      }}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      ActionsComponent={TablePaginationActions}
    />
  );
}

export { Pagination };
